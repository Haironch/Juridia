import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { db } from '../config/database';
import { authenticate } from '../middlewares/auth.middleware';
import type { AuthRequest } from '../types';

const router = Router();
const isProd = process.env.NODE_ENV === 'production';
const safeError = (err: unknown) =>
  isProd ? 'Error interno del servidor' : (err as Error).message;

const now = () => new Date().toISOString();

export const CATEGORIAS_FORO = [
  'Derecho Constitucional',
  'Derecho Penal',
  'Derecho Civil',
  'Derecho Laboral',
  'Derecho Mercantil',
  'Derecho Administrativo',
  'Derecho de Familia',
  'Derecho Tributario',
  'Derecho Procesal',
  'Derecho Notarial',
  'General',
] as const;

// ── GET /api/foros ────────────────────────────────────────────────────────────
// Público — lista posts con filtros, búsqueda y paginación
router.get('/', async (req: Request, res: Response) => {
  const {
    categoria,
    buscar,
    orden = 'recientes',
    pagina = '1',
  } = req.query as Record<string, string>;

  const LIMITE = 15;
  const offset = (Math.max(1, parseInt(pagina)) - 1) * LIMITE;

  try {
    const conditions: string[] = [];
    const args: (string | number)[] = [];

    if (categoria && CATEGORIAS_FORO.includes(categoria as (typeof CATEGORIAS_FORO)[number])) {
      conditions.push('categoria = ?');
      args.push(categoria);
    }
    if (buscar?.trim()) {
      conditions.push('(titulo LIKE ? OR contenido LIKE ?)');
      const q = `%${buscar.trim()}%`;
      args.push(q, q);
    }
    if (orden === 'sin_respuesta') {
      conditions.push('total_respuestas = 0');
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const orderMap: Record<string, string> = {
      recientes:     'fijado DESC, created_at DESC',
      votos:         'fijado DESC, votos DESC, created_at DESC',
      sin_respuesta: 'created_at DESC',
      resueltos:     'fijado DESC, resuelto DESC, created_at DESC',
    };
    const orderBy = `ORDER BY ${orderMap[orden] ?? orderMap.recientes}`;

    const [postsResult, countResult] = await Promise.all([
      db.execute({
        sql: `SELECT id, titulo, categoria, usuario_nombre, votos, vistas,
                     total_respuestas, resuelto, fijado, created_at
              FROM posts_foro ${where} ${orderBy} LIMIT ? OFFSET ?`,
        args: [...args, LIMITE, offset],
      }),
      db.execute({
        sql: `SELECT COUNT(*) AS total FROM posts_foro ${where}`,
        args,
      }),
    ]);

    const total = Number(countResult.rows[0]?.total ?? 0);

    res.json({
      ok: true,
      data: postsResult.rows,
      meta: {
        total,
        pagina: parseInt(pagina),
        totalPaginas: Math.ceil(total / LIMITE),
        limite: LIMITE,
      },
    });
  } catch (err) {
    console.error('[GET /foros]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── GET /api/foros/:id ────────────────────────────────────────────────────────
// Público — detalle del post + respuestas (incrementa vistas)
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.execute({
      sql: 'UPDATE posts_foro SET vistas = vistas + 1 WHERE id = ?',
      args: [id],
    });

    const [postRes, respuestasRes] = await Promise.all([
      db.execute({ sql: 'SELECT * FROM posts_foro WHERE id = ?', args: [id] }),
      db.execute({
        sql: `SELECT * FROM respuestas_foro WHERE post_id = ?
              ORDER BY es_solucion DESC, votos DESC, created_at ASC`,
        args: [id],
      }),
    ]);

    if (postRes.rows.length === 0) {
      res.status(404).json({ ok: false, error: 'Post no encontrado' });
      return;
    }

    res.json({ ok: true, data: { post: postRes.rows[0], respuestas: respuestasRes.rows } });
  } catch (err) {
    console.error('[GET /foros/:id]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── POST /api/foros ───────────────────────────────────────────────────────────
// Requiere auth — crear post
const crearPostSchema = z.object({
  titulo:    z.string().min(10, 'El título debe tener al menos 10 caracteres').max(200),
  contenido: z.string().min(20, 'El contenido debe tener al menos 20 caracteres').max(5000),
  categoria: z.enum(CATEGORIAS_FORO),
});

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const parsed = crearPostSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const { titulo, contenido, categoria } = parsed.data;
  const usuario = req.user!;
  const id = randomUUID();
  const nombre = usuario.email;
  const ts = now();

  try {
    await db.execute({
      sql: `INSERT INTO posts_foro
              (id, titulo, contenido, categoria, usuario_id, usuario_nombre, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, titulo, contenido, categoria, usuario.id, nombre, ts, ts],
    });
    res.status(201).json({ ok: true, data: { id } });
  } catch (err) {
    console.error('[POST /foros]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── POST /api/foros/:id/respuestas ────────────────────────────────────────────
// Requiere auth — responder un post
const crearRespuestaSchema = z.object({
  contenido: z.string().min(10, 'La respuesta debe tener al menos 10 caracteres').max(3000),
});

router.post('/:id/respuestas', authenticate, async (req: AuthRequest, res: Response) => {
  const { id: postId } = req.params;
  const parsed = crearRespuestaSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const { contenido } = parsed.data;
  const usuario = req.user!;
  const respuestaId = randomUUID();
  const nombre = usuario.email;
  const ts = now();

  try {
    const post = await db.execute({
      sql: 'SELECT id FROM posts_foro WHERE id = ?',
      args: [postId],
    });
    if (post.rows.length === 0) {
      res.status(404).json({ ok: false, error: 'Post no encontrado' });
      return;
    }

    await db.execute({
      sql: `INSERT INTO respuestas_foro (id, post_id, contenido, usuario_id, usuario_nombre, created_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [respuestaId, postId, contenido, usuario.id, nombre, ts],
    });
    await db.execute({
      sql: `UPDATE posts_foro SET total_respuestas = total_respuestas + 1, updated_at = ? WHERE id = ?`,
      args: [ts, postId],
    });

    res.status(201).json({ ok: true, data: { id: respuestaId } });
  } catch (err) {
    console.error('[POST /foros/:id/respuestas]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── POST /api/foros/:id/votar ─────────────────────────────────────────────────
// Requiere auth — toggle upvote en post
router.post('/:id/votar', authenticate, async (req: AuthRequest, res: Response) => {
  const { id: postId } = req.params;
  const usuarioId = req.user!.id;

  try {
    const existe = await db.execute({
      sql: `SELECT 1 FROM votos_foro WHERE usuario_id = ? AND referencia_id = ? AND tipo_ref = 'post'`,
      args: [usuarioId, postId],
    });

    if (existe.rows.length > 0) {
      await db.execute({
        sql: `DELETE FROM votos_foro WHERE usuario_id = ? AND referencia_id = ? AND tipo_ref = 'post'`,
        args: [usuarioId, postId],
      });
      await db.execute({
        sql: 'UPDATE posts_foro SET votos = MAX(0, votos - 1) WHERE id = ?',
        args: [postId],
      });
      res.json({ ok: true, accion: 'quitado' });
      return;
    }

    await db.execute({
      sql: `INSERT INTO votos_foro (usuario_id, referencia_id, tipo_ref) VALUES (?, ?, 'post')`,
      args: [usuarioId, postId],
    });
    await db.execute({
      sql: 'UPDATE posts_foro SET votos = votos + 1 WHERE id = ?',
      args: [postId],
    });
    res.json({ ok: true, accion: 'agregado' });
  } catch (err) {
    console.error('[POST /foros/:id/votar]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── POST /api/foros/respuestas/:id/votar ─────────────────────────────────────
// Requiere auth — toggle upvote en respuesta
router.post('/respuestas/:id/votar', authenticate, async (req: AuthRequest, res: Response) => {
  const { id: respuestaId } = req.params;
  const usuarioId = req.user!.id;

  try {
    const existe = await db.execute({
      sql: `SELECT 1 FROM votos_foro WHERE usuario_id = ? AND referencia_id = ? AND tipo_ref = 'respuesta'`,
      args: [usuarioId, respuestaId],
    });

    if (existe.rows.length > 0) {
      await db.execute({
        sql: `DELETE FROM votos_foro WHERE usuario_id = ? AND referencia_id = ? AND tipo_ref = 'respuesta'`,
        args: [usuarioId, respuestaId],
      });
      await db.execute({
        sql: 'UPDATE respuestas_foro SET votos = MAX(0, votos - 1) WHERE id = ?',
        args: [respuestaId],
      });
      res.json({ ok: true, accion: 'quitado' });
      return;
    }

    await db.execute({
      sql: `INSERT INTO votos_foro (usuario_id, referencia_id, tipo_ref) VALUES (?, ?, 'respuesta')`,
      args: [usuarioId, respuestaId],
    });
    await db.execute({
      sql: 'UPDATE respuestas_foro SET votos = votos + 1 WHERE id = ?',
      args: [respuestaId],
    });
    res.json({ ok: true, accion: 'agregado' });
  } catch (err) {
    console.error('[POST /foros/respuestas/:id/votar]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── PATCH /api/foros/respuestas/:id/solucion ──────────────────────────────────
// Requiere auth — el autor del post marca/desmarca la mejor respuesta
router.patch('/respuestas/:id/solucion', authenticate, async (req: AuthRequest, res: Response) => {
  const { id: respuestaId } = req.params;
  const usuario = req.user!;

  try {
    const respuestaRes = await db.execute({
      sql: `SELECT r.id, r.post_id, r.es_solucion, p.usuario_id AS post_autor
            FROM respuestas_foro r JOIN posts_foro p ON p.id = r.post_id
            WHERE r.id = ?`,
      args: [respuestaId],
    });

    if (respuestaRes.rows.length === 0) {
      res.status(404).json({ ok: false, error: 'Respuesta no encontrada' });
      return;
    }

    const row = respuestaRes.rows[0];
    const esAdmin = usuario.rol === 'SUPER_ADMIN';

    if (row.post_autor !== usuario.id && !esAdmin) {
      res.status(403).json({ ok: false, error: 'Solo el autor del post puede marcar la solución' });
      return;
    }

    const postId = row.post_id as string;
    const yaEsSolucion = Number(row.es_solucion) === 1;

    // Desmarcar todas las respuestas del post
    await db.execute({
      sql: 'UPDATE respuestas_foro SET es_solucion = 0 WHERE post_id = ?',
      args: [postId],
    });

    if (!yaEsSolucion) {
      await db.execute({
        sql: 'UPDATE respuestas_foro SET es_solucion = 1 WHERE id = ?',
        args: [respuestaId],
      });
      await db.execute({
        sql: 'UPDATE posts_foro SET resuelto = 1 WHERE id = ?',
        args: [postId],
      });
    } else {
      await db.execute({
        sql: 'UPDATE posts_foro SET resuelto = 0 WHERE id = ?',
        args: [postId],
      });
    }

    res.json({ ok: true, resuelto: !yaEsSolucion });
  } catch (err) {
    console.error('[PATCH /foros/respuestas/:id/solucion]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── DELETE /api/foros/:id ─────────────────────────────────────────────────────
// Requiere auth — eliminar post (autor o admin)
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const usuario = req.user!;

  try {
    const post = await db.execute({
      sql: 'SELECT usuario_id FROM posts_foro WHERE id = ?',
      args: [id],
    });
    if (post.rows.length === 0) {
      res.status(404).json({ ok: false, error: 'Post no encontrado' });
      return;
    }

    const esAdmin = usuario.rol === 'SUPER_ADMIN';
    if (post.rows[0].usuario_id !== usuario.id && !esAdmin) {
      res.status(403).json({ ok: false, error: 'Sin permisos para eliminar este post' });
      return;
    }

    await db.execute({ sql: 'DELETE FROM posts_foro WHERE id = ?', args: [id] });
    res.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /foros/:id]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

export default router;
