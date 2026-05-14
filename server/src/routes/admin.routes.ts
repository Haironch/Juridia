import { Router, Response } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { db } from '../config/database';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { AuthRequest } from '../types';

const router = Router();
const isProd = process.env.NODE_ENV === 'production';
const safeError = (err: unknown) =>
  isProd ? 'Error interno del servidor' : (err as Error).message;

// Todas las rutas admin requieren autenticación + rol admin
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN_CONTENIDO'));

// ── GET /api/admin/stats ─────────────────────────────────────────────────────
router.get('/stats', async (_req: AuthRequest, res: Response) => {
  try {
    const [totalUsuarios, usuariosActivos, totalCursos, cursosPublicados, nuevosHoy] =
      await Promise.all([
        db.execute("SELECT COUNT(*) as total FROM usuarios"),
        db.execute("SELECT COUNT(*) as total FROM usuarios WHERE estado = 'ACTIVO'"),
        db.execute("SELECT COUNT(*) as total FROM cursos"),
        db.execute("SELECT COUNT(*) as total FROM cursos WHERE publicado = 1"),
        db.execute(
          "SELECT COUNT(*) as total FROM usuarios WHERE DATE(fecha_registro) = DATE('now')"
        ),
      ]);

    res.json({
      ok: true,
      data: {
        totalUsuarios: Number(totalUsuarios.rows[0].total),
        usuariosActivos: Number(usuariosActivos.rows[0].total),
        totalCursos: Number(totalCursos.rows[0].total),
        cursosPublicados: Number(cursosPublicados.rows[0].total),
        nuevosHoy: Number(nuevosHoy.rows[0].total),
      },
    });
  } catch (err) {
    console.error('[GET /admin/stats]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── GET /api/admin/usuarios ──────────────────────────────────────────────────
router.get('/usuarios', async (req: AuthRequest, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
  const search = ((req.query.search as string) || '').trim();
  const offset = (page - 1) * limit;

  try {
    const where = search
      ? "WHERE (email LIKE ? OR nombre LIKE ? OR apellido LIKE ?)"
      : '';
    const args = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

    const [usuarios, countResult] = await Promise.all([
      db.execute({
        sql: `SELECT id, email, nombre, apellido, rol, estado, fecha_registro, ultimo_acceso
              FROM usuarios ${where}
              ORDER BY fecha_registro DESC
              LIMIT ? OFFSET ?`,
        args: [...args, limit, offset],
      }),
      db.execute({
        sql: `SELECT COUNT(*) as total FROM usuarios ${where}`,
        args,
      }),
    ]);

    const total = Number(countResult.rows[0].total);

    res.json({
      ok: true,
      data: {
        usuarios: usuarios.rows,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('[GET /admin/usuarios]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── PATCH /api/admin/usuarios/:id/estado ────────────────────────────────────
const estadoSchema = z.object({ estado: z.enum(['ACTIVO', 'SUSPENDIDO']) });

router.patch('/usuarios/:id/estado', async (req: AuthRequest, res: Response) => {
  const parsed = estadoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  try {
    const now = new Date().toISOString();
    const result = await db.execute({
      sql: 'UPDATE usuarios SET estado = ?, updatedAt = ? WHERE id = ?',
      args: [parsed.data.estado, now, req.params.id],
    });

    if (result.rowsAffected === 0) {
      res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
      return;
    }

    res.json({ ok: true, message: `Usuario ${parsed.data.estado === 'ACTIVO' ? 'activado' : 'suspendido'}` });
  } catch (err) {
    console.error('[PATCH /admin/usuarios/:id/estado]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── PATCH /api/admin/usuarios/:id/rol ───────────────────────────────────────
const rolSchema = z.object({
  rol: z.enum(['FREE', 'PREMIUM', 'TUTOR', 'ADMIN_CONTENIDO', 'SUPER_ADMIN']),
});

router.patch('/usuarios/:id/rol', async (req: AuthRequest, res: Response) => {
  const parsed = rolSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  // Prevenir auto-degradación del superadmin
  if (req.user?.id === req.params.id && parsed.data.rol !== 'SUPER_ADMIN') {
    res.status(403).json({ ok: false, error: 'No puedes cambiar tu propio rol' });
    return;
  }

  try {
    const now = new Date().toISOString();
    const result = await db.execute({
      sql: 'UPDATE usuarios SET rol = ?, updatedAt = ? WHERE id = ?',
      args: [parsed.data.rol, now, req.params.id],
    });

    if (result.rowsAffected === 0) {
      res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
      return;
    }

    res.json({ ok: true, message: 'Rol actualizado' });
  } catch (err) {
    console.error('[PATCH /admin/usuarios/:id/rol]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── GET /api/admin/cursos ────────────────────────────────────────────────────
router.get('/cursos', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await db.execute(`
      SELECT
        c.id, c.titulo, c.descripcion, c.nivel, c.duracion,
        c.es_premium, c.thumbnail, c.publicado, c.createdAt,
        cat.nombre AS categoria, cat.id AS categoria_id,
        COUNT(m.id) AS totalModulos
      FROM cursos c
      JOIN categorias_derecho cat ON c.categoria_id = cat.id
      LEFT JOIN modulos_curso m ON m.curso_id = c.id
      GROUP BY c.id
      ORDER BY c.createdAt DESC
    `);

    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error('[GET /admin/cursos]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── GET /api/admin/categorias ────────────────────────────────────────────────
router.get('/categorias', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await db.execute(
      'SELECT id, nombre, icono, orden FROM categorias_derecho ORDER BY orden'
    );
    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error('[GET /admin/categorias]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── POST /api/admin/cursos ───────────────────────────────────────────────────
const cursoSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(200),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(2000),
  nivel: z.enum(['BASICO', 'INTERMEDIO', 'AVANZADO']),
  duracion: z.string().min(1).max(50),
  es_premium: z.boolean().default(false),
  thumbnail: z.string().url('URL de thumbnail inválida').optional().or(z.literal('')),
  categoria_id: z.string().uuid('ID de categoría inválido'),
  publicado: z.boolean().default(false),
});

router.post('/cursos', async (req: AuthRequest, res: Response) => {
  const parsed = cursoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  try {
    const id = randomUUID();
    const now = new Date().toISOString();
    const { titulo, descripcion, nivel, duracion, es_premium, thumbnail, categoria_id, publicado } =
      parsed.data;

    await db.execute({
      sql: `INSERT INTO cursos
              (id, titulo, descripcion, nivel, duracion, es_premium, thumbnail, categoria_id, publicado, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, titulo, descripcion, nivel, duracion,
        es_premium ? 1 : 0, thumbnail || null,
        categoria_id, publicado ? 1 : 0,
        now, now,
      ],
    });

    res.status(201).json({ ok: true, data: { id }, message: 'Curso creado exitosamente' });
  } catch (err) {
    console.error('[POST /admin/cursos]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── PUT /api/admin/cursos/:id ────────────────────────────────────────────────
router.put('/cursos/:id', async (req: AuthRequest, res: Response) => {
  const parsed = cursoSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const { titulo, descripcion, nivel, duracion, es_premium, thumbnail, categoria_id, publicado } =
    parsed.data;

  const fields: string[] = [];
  const args: (string | number | null)[] = [];

  if (titulo !== undefined)       { fields.push('titulo = ?');       args.push(titulo); }
  if (descripcion !== undefined)  { fields.push('descripcion = ?');  args.push(descripcion); }
  if (nivel !== undefined)        { fields.push('nivel = ?');        args.push(nivel); }
  if (duracion !== undefined)     { fields.push('duracion = ?');     args.push(duracion); }
  if (es_premium !== undefined)   { fields.push('es_premium = ?');   args.push(es_premium ? 1 : 0); }
  if (thumbnail !== undefined)    { fields.push('thumbnail = ?');    args.push(thumbnail || null); }
  if (categoria_id !== undefined) { fields.push('categoria_id = ?'); args.push(categoria_id); }
  if (publicado !== undefined)    { fields.push('publicado = ?');    args.push(publicado ? 1 : 0); }

  if (fields.length === 0) {
    res.status(400).json({ ok: false, error: 'No hay campos para actualizar' });
    return;
  }

  try {
    const now = new Date().toISOString();
    fields.push('updatedAt = ?');
    args.push(now, req.params.id);

    const result = await db.execute({
      sql: `UPDATE cursos SET ${fields.join(', ')} WHERE id = ?`,
      args,
    });

    if (result.rowsAffected === 0) {
      res.status(404).json({ ok: false, error: 'Curso no encontrado' });
      return;
    }

    res.json({ ok: true, message: 'Curso actualizado' });
  } catch (err) {
    console.error('[PUT /admin/cursos/:id]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── PATCH /api/admin/cursos/:id/publicado ────────────────────────────────────
router.patch('/cursos/:id/publicado', async (req: AuthRequest, res: Response) => {
  const parsed = z.object({ publicado: z.boolean() }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: 'publicado debe ser un booleano' });
    return;
  }

  try {
    const now = new Date().toISOString();
    await db.execute({
      sql: 'UPDATE cursos SET publicado = ?, updatedAt = ? WHERE id = ?',
      args: [parsed.data.publicado ? 1 : 0, now, req.params.id],
    });
    res.json({
      ok: true,
      message: `Curso ${parsed.data.publicado ? 'publicado' : 'ocultado'} correctamente`,
    });
  } catch (err) {
    console.error('[PATCH /admin/cursos/:id/publicado]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ── DELETE /api/admin/cursos/:id ─────────────────────────────────────────────
router.delete('/cursos/:id', async (req: AuthRequest, res: Response) => {
  try {
    await db.execute({
      sql: 'DELETE FROM modulos_curso WHERE curso_id = ?',
      args: [req.params.id],
    });
    const result = await db.execute({
      sql: 'DELETE FROM cursos WHERE id = ?',
      args: [req.params.id],
    });

    if (result.rowsAffected === 0) {
      res.status(404).json({ ok: false, error: 'Curso no encontrado' });
      return;
    }

    res.json({ ok: true, message: 'Curso eliminado correctamente' });
  } catch (err) {
    console.error('[DELETE /admin/cursos/:id]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

export default router;
