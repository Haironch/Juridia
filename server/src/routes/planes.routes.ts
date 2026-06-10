import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { db } from '../config/database';
import { authenticate } from '../middlewares/auth.middleware';
import { generarPlan } from '../utils/planGenerator';
import type { AuthRequest } from '../types';

const router = Router();

const crearPlanSchema = z.object({
  examen: z.enum(['privado', 'civil', 'penal', 'laboral']),
  fase: z.enum(['basica', 'intermedia', 'avanzada']),
  semanas_disponibles: z.number().int().min(4).max(16),
  fecha_examen: z.string().optional(),
});

const now = () => new Date().toISOString();

// ── POST /api/planes — crear plan ────────────────────────────────────────────
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const parsed = crearPlanSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const { examen, fase, semanas_disponibles, fecha_examen } = parsed.data;
  const usuario = req.user!;

  try {
    const planId = randomUUID();
    const ahora = now();

    // Generar estructura del plan
    const semanas = generarPlan({ examen, fase, semanas: semanas_disponibles });

    // Guardar plan en DB
    await db.execute({
      sql: `INSERT INTO planes_estudio
            (id, usuario_id, examen, fase, semanas_disponibles, fecha_examen, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        planId,
        usuario.id,
        examen,
        fase,
        semanas_disponibles,
        fecha_examen ?? null,
        ahora,
        ahora,
      ],
    });

    // Guardar cada semana
    const hoy = new Date();
    for (let i = 0; i < semanas.length; i++) {
      const semana = semanas[i];
      const inicio = new Date(hoy);
      inicio.setDate(inicio.getDate() + i * 7);
      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + 6);

      const semanaId = randomUUID();
      await db.execute({
        sql: `INSERT INTO plan_semanas
              (id, plan_id, numero_semana, titulo, descripcion, recursos, fecha_inicio, fecha_fin, estado, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          semanaId,
          planId,
          i + 1,
          semana.titulo,
          semana.descripcion,
          JSON.stringify(semana.recursos),
          inicio.toISOString().split('T')[0],
          fin.toISOString().split('T')[0],
          'pendiente',
          ahora,
        ],
      });
    }

    res.status(201).json({ ok: true, data: { id: planId, semanas } });
  } catch (err) {
    console.error('[POST /planes]', err);
    res
      .status(500)
      .json({ ok: false, error: 'Error al crear plan de estudio' });
  }
});

// ── GET /api/planes/:id — obtener plan completo ──────────────────────────────
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const usuario = req.user!;

  try {
    const planRes = await db.execute({
      sql: 'SELECT * FROM planes_estudio WHERE id = ? AND usuario_id = ?',
      args: [id, usuario.id],
    });

    if (planRes.rows.length === 0) {
      res.status(404).json({ ok: false, error: 'Plan no encontrado' });
      return;
    }

    const semanasRes = await db.execute({
      sql: 'SELECT * FROM plan_semanas WHERE plan_id = ? ORDER BY numero_semana',
      args: [id],
    });

    const semanasConProgreso = await Promise.all(
      semanasRes.rows.map(async (s: any) => {
        const progreso = await db.execute({
          sql: 'SELECT * FROM plan_progreso WHERE plan_semana_id = ? AND usuario_id = ?',
          args: [s.id, usuario.id],
        });
        return {
          ...s,
          recursos: JSON.parse(s.recursos || '[]'),
          progreso: progreso.rows[0] ?? null,
        };
      })
    );

    res.json({
      ok: true,
      data: {
        plan: planRes.rows[0],
        semanas: semanasConProgreso,
      },
    });
  } catch (err) {
    console.error('[GET /planes/:id]', err);
    res.status(500).json({ ok: false, error: 'Error al obtener plan' });
  }
});

// ── GET /api/planes — listar planes del usuario ──────────────────────────────
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const usuario = req.user!;

  try {
    const planesRes = await db.execute({
      sql: `SELECT p.id, p.usuario_id, p.examen, p.fase, p.semanas_disponibles,
                   p.fecha_examen, p.created_at, p.updated_at,
                   COUNT(DISTINCT ps.id) as total_semanas,
                   COALESCE(SUM(CASE WHEN pp.completado = 1 THEN 1 ELSE 0 END), 0) as semanas_completadas
            FROM planes_estudio p
            LEFT JOIN plan_semanas ps ON ps.plan_id = p.id
            LEFT JOIN plan_progreso pp ON pp.plan_semana_id = ps.id AND pp.usuario_id = ?
            WHERE p.usuario_id = ?
            GROUP BY p.id
            ORDER BY p.created_at DESC`,
      args: [usuario.id, usuario.id],
    });

    res.json({ ok: true, data: planesRes.rows });
  } catch (err) {
    console.error('[GET /planes]', err);
    res.status(500).json({ ok: false, error: 'Error al listar planes' });
  }
});

// ── PATCH /api/planes/semanas/:id — marcar semana como completada ────────────
router.patch('/semanas/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const usuario = req.user!;

  try {
    const existeRes = await db.execute({
      sql: `SELECT pp.* FROM plan_progreso pp
            JOIN plan_semanas ps ON ps.id = pp.plan_semana_id
            WHERE pp.plan_semana_id = ? AND pp.usuario_id = ?`,
      args: [id, usuario.id],
    });

    if (existeRes.rows.length === 0) {
      // Crear registro de progreso completado
      const idProgreso = randomUUID();
      await db.execute({
        sql: `INSERT INTO plan_progreso
              (id, plan_semana_id, usuario_id, completado, porcentaje, ultima_actualizacion)
              VALUES (?, ?, ?, 1, 100, ?)`,
        args: [idProgreso, id, usuario.id, now()],
      });
    } else {
      // Toggle completado
      const actual = existeRes.rows[0];
      const nuevoCompletado = actual.completado === 1 ? 0 : 1;
      const nuevoPorcentaje = nuevoCompletado ? 100 : 0;
      await db.execute({
        sql: `UPDATE plan_progreso
              SET completado = ?, porcentaje = ?, ultima_actualizacion = ?
              WHERE plan_semana_id = ? AND usuario_id = ?`,
        args: [nuevoCompletado, nuevoPorcentaje, now(), id, usuario.id],
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[PATCH /planes/semanas/:id]', err);
    res.status(500).json({ ok: false, error: 'Error al actualizar progreso' });
  }
});

// ── DELETE /api/planes/:id — eliminar plan ──────────────────────────────────
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const usuario = req.user!;

  try {
    const planRes = await db.execute({
      sql: 'SELECT usuario_id FROM planes_estudio WHERE id = ?',
      args: [id],
    });

    if (planRes.rows.length === 0) {
      res.status(404).json({ ok: false, error: 'Plan no encontrado' });
      return;
    }

    if (planRes.rows[0].usuario_id !== usuario.id) {
      res.status(403).json({ ok: false, error: 'No tienes permiso para eliminar este plan' });
      return;
    }

    await db.execute({
      sql: 'DELETE FROM planes_estudio WHERE id = ?',
      args: [id],
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /planes/:id]', err);
    res.status(500).json({ ok: false, error: 'Error al eliminar plan' });
  }
});

export default router;
