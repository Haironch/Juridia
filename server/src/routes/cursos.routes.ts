import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import { z } from "zod";
import { db } from "../config/database";
import { authenticate } from "../middlewares/auth.middleware";
import { AuthRequest } from "../types";

const router = Router();
const isProd = process.env.NODE_ENV === "production";

const safeError = (err: unknown) =>
  isProd ? "Error interno del servidor" : (err as Error).message;

// Valida que :id sea un UUID v4 — rechaza inyecciones y valores malformados
const idSchema = z.string().uuid({ message: "ID de curso inválido" });

// GET /api/cursos — lista todos los publicados
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await db.execute(`
      SELECT
        c.id, c.titulo, c.descripcion, c.nivel, c.duracion,
        c.es_premium, c.thumbnail, c.createdAt,
        cat.nombre AS categoria, cat.icono AS categoriaIcono,
        COUNT(m.id) AS totalModulos
      FROM cursos c
      JOIN categorias_derecho cat ON c.categoria_id = cat.id
      LEFT JOIN modulos_curso m ON m.curso_id = c.id
      WHERE c.publicado = 1
      GROUP BY c.id
      ORDER BY cat.orden, c.createdAt
    `);

    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error("[GET /cursos]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// GET /api/cursos/:id — detalle con módulos
router.get("/:id", async (req: Request, res: Response) => {
  const parsed = idSchema.safeParse(req.params.id);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const id = parsed.data;

  try {
    const cursoResult = await db.execute({
      sql: `
        SELECT
          c.id, c.titulo, c.descripcion, c.nivel, c.duracion,
          c.es_premium, c.thumbnail, c.createdAt,
          cat.nombre AS categoria, cat.icono AS categoriaIcono
        FROM cursos c
        JOIN categorias_derecho cat ON c.categoria_id = cat.id
        WHERE c.id = ? AND c.publicado = 1
        LIMIT 1
      `,
      args: [id],
    });

    if (cursoResult.rows.length === 0) {
      res.status(404).json({ ok: false, error: "Curso no encontrado" });
      return;
    }

    const modulosResult = await db.execute({
      sql: `
        SELECT id, orden, titulo, contenido, duracion_estimada
        FROM modulos_curso
        WHERE curso_id = ?
        ORDER BY orden
      `,
      args: [id],
    });

    res.json({
      ok: true,
      data: { ...cursoResult.rows[0], modulos: modulosResult.rows },
    });
  } catch (err) {
    console.error("[GET /cursos/:id]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// ─── Endpoints autenticados ───────────────────────────────────────────────────

const moduloIdSchema = z.string().uuid({ message: "ID de módulo inválido" });

// GET /api/cursos/:cursoId/progreso — progreso del usuario en el curso
router.get("/:cursoId/progreso", authenticate, async (req: AuthRequest, res: Response) => {
  const parsed = idSchema.safeParse(req.params.cursoId);
  if (!parsed.success) { res.status(400).json({ ok: false, error: parsed.error.issues[0].message }); return; }

  const userId = req.user!.id;
  const cursoId = parsed.data;

  try {
    const progreso = await db.execute({
      sql: `SELECT modulo_id, completado, quiz_aprobado, puntaje_quiz FROM progreso_modulo WHERE usuario_id = ? AND curso_id = ?`,
      args: [userId, cursoId],
    });

    const certificado = await db.execute({
      sql: `SELECT codigo_unico, puntaje_final, emitido_en FROM certificados WHERE usuario_id = ? AND curso_id = ?`,
      args: [userId, cursoId],
    });

    res.json({ ok: true, data: { modulos: progreso.rows, certificado: certificado.rows[0] ?? null } });
  } catch (err) {
    console.error("[GET /cursos/:id/progreso]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// GET /api/cursos/:cursoId/modulos/:moduloId — contenido de la lección + preguntas del quiz
router.get("/:cursoId/modulos/:moduloId", authenticate, async (req: AuthRequest, res: Response) => {
  const parsedCurso = idSchema.safeParse(req.params.cursoId);
  const parsedModulo = moduloIdSchema.safeParse(req.params.moduloId);
  if (!parsedCurso.success || !parsedModulo.success) {
    res.status(400).json({ ok: false, error: "ID inválido" }); return;
  }

  const userId = req.user!.id;
  const cursoId = parsedCurso.data;
  const moduloId = parsedModulo.data;

  try {
    const modulo = await db.execute({
      sql: `SELECT id, orden, titulo, contenido, duracion_estimada FROM modulos_curso WHERE id = ? AND curso_id = ? LIMIT 1`,
      args: [moduloId, cursoId],
    });
    if (modulo.rows.length === 0) { res.status(404).json({ ok: false, error: "Lección no encontrada" }); return; }

    // Verificar que la lección anterior fue aprobada (orden > 1)
    const mod = modulo.rows[0] as any;
    if (mod.orden > 1) {
      const anterior = await db.execute({
        sql: `SELECT m.id FROM modulos_curso m WHERE m.curso_id = ? AND m.orden = ?`,
        args: [cursoId, mod.orden - 1],
      });
      if (anterior.rows.length > 0) {
        const antId = (anterior.rows[0] as any).id;
        const aprobado = await db.execute({
          sql: `SELECT quiz_aprobado FROM progreso_modulo WHERE usuario_id = ? AND modulo_id = ?`,
          args: [userId, antId],
        });
        if ((aprobado.rows[0] as any)?.quiz_aprobado !== 1) {
          res.status(403).json({ ok: false, error: "Debes aprobar la lección anterior primero." }); return;
        }
      }
    }

    const preguntas = await db.execute({
      sql: `
        SELECT p.id, p.texto, p.explicacion,
          json_group_array(json_object('id', o.id, 'texto', o.texto, 'orden', o.orden)) AS opciones
        FROM preguntas p
        JOIN opciones_respuesta o ON o.pregunta_id = p.id
        WHERE p.modulo_id = ? AND p.tipo = 'quiz_modulo'
        GROUP BY p.id
        ORDER BY p.rowid
      `,
      args: [moduloId],
    });

    const progresoRow = await db.execute({
      sql: `SELECT completado, quiz_aprobado, puntaje_quiz FROM progreso_modulo WHERE usuario_id = ? AND modulo_id = ?`,
      args: [userId, moduloId],
    });

    res.json({
      ok: true,
      data: {
        modulo: mod,
        preguntas: preguntas.rows.map((p: any) => ({
          ...p,
          opciones: JSON.parse(p.opciones as string),
        })),
        progreso: progresoRow.rows[0] ?? null,
      },
    });
  } catch (err) {
    console.error("[GET /cursos/:id/modulos/:mid]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// POST /api/cursos/:cursoId/modulos/:moduloId/quiz — enviar respuestas del quiz
router.post("/:cursoId/modulos/:moduloId/quiz", authenticate, async (req: AuthRequest, res: Response) => {
  const parsedCurso = idSchema.safeParse(req.params.cursoId);
  const parsedModulo = moduloIdSchema.safeParse(req.params.moduloId);
  if (!parsedCurso.success || !parsedModulo.success) {
    res.status(400).json({ ok: false, error: "ID inválido" }); return;
  }

  const bodySchema = z.object({ respuestas: z.record(z.string().uuid(), z.string().uuid()) });
  const body = bodySchema.safeParse(req.body);
  if (!body.success) { res.status(400).json({ ok: false, error: "Respuestas inválidas" }); return; }

  const userId = req.user!.id;
  const cursoId = parsedCurso.data;
  const moduloId = parsedModulo.data;
  const respuestas = body.data.respuestas; // { preguntaId: opcionId }

  try {
    const correctas = await db.execute({
      sql: `SELECT p.id AS pregunta_id, o.id AS opcion_correcta_id
            FROM preguntas p JOIN opciones_respuesta o ON o.pregunta_id = p.id
            WHERE p.modulo_id = ? AND p.tipo = 'quiz_modulo' AND o.es_correcta = 1`,
      args: [moduloId],
    });

    let aciertos = 0;
    const total = correctas.rows.length;
    const detalle: Record<string, boolean> = {};
    const opcionesCorrectas: Record<string, string> = {};

    for (const row of correctas.rows as any[]) {
      const esCorrecta = respuestas[row.pregunta_id] === row.opcion_correcta_id;
      if (esCorrecta) aciertos++;
      detalle[row.pregunta_id] = esCorrecta;
      opcionesCorrectas[row.pregunta_id] = row.opcion_correcta_id;
    }

    const puntaje = Math.round((aciertos / total) * 100);
    const aprobado = puntaje >= 60; // 60% mínimo para pasar
    const now = new Date().toISOString();

    const existing = await db.execute({
      sql: `SELECT id FROM progreso_modulo WHERE usuario_id = ? AND modulo_id = ?`,
      args: [userId, moduloId],
    });

    if (existing.rows.length > 0) {
      await db.execute({
        sql: `UPDATE progreso_modulo SET completado = 1, quiz_aprobado = ?, puntaje_quiz = ?, completado_en = ?, updatedAt = ? WHERE usuario_id = ? AND modulo_id = ?`,
        args: [aprobado ? 1 : 0, puntaje, aprobado ? now : null, now, userId, moduloId],
      });
    } else {
      await db.execute({
        sql: `INSERT INTO progreso_modulo (id, usuario_id, modulo_id, curso_id, completado, quiz_aprobado, puntaje_quiz, completado_en, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`,
        args: [randomUUID(), userId, moduloId, cursoId, aprobado ? 1 : 0, puntaje, aprobado ? now : null, now, now],
      });
    }

    res.json({ ok: true, data: { puntaje, aprobado, aciertos, total, detalle, opcionesCorrectas } });
  } catch (err) {
    console.error("[POST /cursos/:id/modulos/:mid/quiz]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// GET /api/cursos/:cursoId/evaluacion — preguntas del examen final (requiere todos los módulos aprobados)
router.get("/:cursoId/evaluacion", authenticate, async (req: AuthRequest, res: Response) => {
  const parsed = idSchema.safeParse(req.params.cursoId);
  if (!parsed.success) { res.status(400).json({ ok: false, error: parsed.error.issues[0].message }); return; }

  const userId = req.user!.id;
  const cursoId = parsed.data;

  try {
    const totalModulos = await db.execute({
      sql: `SELECT COUNT(*) AS total FROM modulos_curso WHERE curso_id = ?`,
      args: [cursoId],
    });
    const aprobadosCount = await db.execute({
      sql: `SELECT COUNT(*) AS total FROM progreso_modulo WHERE usuario_id = ? AND curso_id = ? AND quiz_aprobado = 1`,
      args: [userId, cursoId],
    });

    const total = (totalModulos.rows[0] as any).total as number;
    const aprobados = (aprobadosCount.rows[0] as any).total as number;

    if (aprobados < total) {
      res.status(403).json({ ok: false, error: `Debes completar los ${total} módulos antes de presentar el examen final.`, pendientes: total - aprobados });
      return;
    }

    const preguntas = await db.execute({
      sql: `
        SELECT p.id, p.texto,
          json_group_array(json_object('id', o.id, 'texto', o.texto, 'orden', o.orden)) AS opciones
        FROM preguntas p
        JOIN opciones_respuesta o ON o.pregunta_id = p.id
        WHERE p.curso_id = ? AND p.tipo = 'evaluacion_final'
        GROUP BY p.id
        ORDER BY p.rowid
      `,
      args: [cursoId],
    });

    res.json({
      ok: true,
      data: preguntas.rows.map((p: any) => ({ ...p, opciones: JSON.parse(p.opciones as string) })),
    });
  } catch (err) {
    console.error("[GET /cursos/:id/evaluacion]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

// POST /api/cursos/:cursoId/evaluacion — enviar examen final y emitir certificado
router.post("/:cursoId/evaluacion", authenticate, async (req: AuthRequest, res: Response) => {
  const parsed = idSchema.safeParse(req.params.cursoId);
  if (!parsed.success) { res.status(400).json({ ok: false, error: parsed.error.issues[0].message }); return; }

  const bodySchema = z.object({ respuestas: z.record(z.string().uuid(), z.string().uuid()) });
  const body = bodySchema.safeParse(req.body);
  if (!body.success) { res.status(400).json({ ok: false, error: "Respuestas inválidas" }); return; }

  const userId = req.user!.id;
  const cursoId = parsed.data;
  const respuestas = body.data.respuestas;

  try {
    const correctas = await db.execute({
      sql: `SELECT p.id AS pregunta_id, o.id AS opcion_correcta_id
            FROM preguntas p JOIN opciones_respuesta o ON o.pregunta_id = p.id
            WHERE p.curso_id = ? AND p.tipo = 'evaluacion_final' AND o.es_correcta = 1`,
      args: [cursoId],
    });

    let aciertos = 0;
    const total = correctas.rows.length;
    const detalle: Record<string, boolean> = {};
    const opcionesCorrectas: Record<string, string> = {};

    for (const row of correctas.rows as any[]) {
      const esCorrecta = respuestas[row.pregunta_id] === row.opcion_correcta_id;
      if (esCorrecta) aciertos++;
      detalle[row.pregunta_id] = esCorrecta;
      opcionesCorrectas[row.pregunta_id] = row.opcion_correcta_id;
    }

    const puntaje = Math.round((aciertos / total) * 100);
    const aprobado = puntaje >= 70; // 70% para certificarse
    const now = new Date().toISOString();

    // Registrar intento
    const intentoAnterior = await db.execute({
      sql: `SELECT COUNT(*) AS total FROM intentos_evaluacion WHERE usuario_id = ? AND curso_id = ?`,
      args: [userId, cursoId],
    });
    const numIntento = ((intentoAnterior.rows[0] as any).total as number) + 1;

    await db.execute({
      sql: `INSERT INTO intentos_evaluacion (id, usuario_id, curso_id, puntaje, aprobado, intento_num, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [randomUUID(), userId, cursoId, puntaje, aprobado ? 1 : 0, numIntento, now],
    });

    if (!aprobado) {
      res.json({ ok: true, data: { puntaje, aprobado, aciertos, total, detalle, opcionesCorrectas, certificado: null } });
      return;
    }

    // Emitir certificado (o devolver el existente)
    const existente = await db.execute({
      sql: `SELECT codigo_unico, puntaje_final, emitido_en FROM certificados WHERE usuario_id = ? AND curso_id = ?`,
      args: [userId, cursoId],
    });

    let certificado: any;
    if (existente.rows.length > 0) {
      certificado = existente.rows[0];
    } else {
      const año = new Date().getFullYear();
      const codigo = `JUR-${año}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      await db.execute({
        sql: `INSERT INTO certificados (id, usuario_id, curso_id, codigo_unico, puntaje_final, emitido_en) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [randomUUID(), userId, cursoId, codigo, puntaje, now],
      });
      certificado = { codigo_unico: codigo, puntaje_final: puntaje, emitido_en: now };
    }

    res.json({ ok: true, data: { puntaje, aprobado, aciertos, total, detalle, opcionesCorrectas, certificado } });
  } catch (err) {
    console.error("[POST /cursos/:id/evaluacion]", err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
});

export default router;
