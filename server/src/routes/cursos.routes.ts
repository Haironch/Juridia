import { Router, Request, Response } from "express";
import { z } from "zod";
import { db } from "../config/database";

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

export default router;
