import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '../config/supabase';
import { db } from '../config/database';

const router = Router();

// POST /api/auth/sync — crea o devuelve el perfil en Turso después del auth de Supabase
router.post('/sync', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ ok: false, error: 'Token no proporcionado' });
    return;
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ ok: false, error: 'Token inválido' });
    return;
  }

  const supaUser = data.user;
  const now = new Date().toISOString();

  try {
    // Ver si ya existe en Turso
    const existing = await db.execute({
      sql: 'SELECT id, email, nombre, apellido, rol, racha_actual, racha_maxima FROM usuarios WHERE id = ? LIMIT 1',
      args: [supaUser.id],
    });

    if (existing.rows.length > 0) {
      // Actualizar racha de días consecutivos
      const user = existing.rows[0] as any;
      const hoy = now.split('T')[0];
      const ayer = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];

      const rachaRes = await db.execute({
        sql: 'SELECT racha_actual, racha_maxima, ultimo_dia_actividad FROM usuarios WHERE id = ?',
        args: [supaUser.id],
      });
      const r = rachaRes.rows[0] as any;
      const ultimoDia = r?.ultimo_dia_actividad as string | null;

      let nuevaRacha: number;
      if (ultimoDia === hoy) {
        nuevaRacha = (r?.racha_actual as number) || 1;
      } else if (ultimoDia === ayer) {
        nuevaRacha = ((r?.racha_actual as number) || 0) + 1;
      } else {
        nuevaRacha = 1;
      }
      const nuevaRachaMaxima = Math.max((r?.racha_maxima as number) || 0, nuevaRacha);

      await db.execute({
        sql: `UPDATE usuarios SET ultimo_acceso = ?, updatedAt = ?,
              racha_actual = ?, racha_maxima = ?, ultimo_dia_actividad = ? WHERE id = ?`,
        args: [now, now, nuevaRacha, nuevaRachaMaxima, hoy, supaUser.id],
      });

      res.json({
        ok: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            rol: user.rol,
            rachaActual: nuevaRacha,
            rachaMaxima: nuevaRachaMaxima,
          },
        },
      });
      return;
    }

    // Primera vez: crear perfil en Turso usando datos de Supabase metadata
    const metadata = supaUser.user_metadata ?? {};
    const fullName = ((metadata.full_name as string) || '').trim();
    const parts = fullName.split(/\s+/);
    const nombre = (metadata.nombre as string) || parts[0] || 'Usuario';
    const apellido = (metadata.apellido as string) || parts.slice(1).join(' ') || '';
    const email = supaUser.email ?? '';

    await db.execute({
      sql: `INSERT INTO usuarios
            (id, email, password_hash, nombre, apellido, rol, estado, fecha_registro, createdAt, updatedAt, racha_actual, racha_maxima, ultimo_dia_actividad)
            VALUES (?, ?, '', ?, ?, 'FREE', 'ACTIVO', ?, ?, ?, 1, 1, ?)`,
      args: [supaUser.id, email, nombre, apellido, now, now, now, now.split('T')[0]],
    });

    res.status(201).json({
      ok: true,
      data: {
        user: {
          id: supaUser.id,
          email,
          nombre,
          apellido,
          rol: 'FREE',
          rachaActual: 1,
          rachaMaxima: 1,
        },
      },
    });
  } catch (err) {
    console.error('[POST /auth/sync]', err);
    res.status(500).json({ ok: false, error: 'Error al sincronizar perfil' });
  }
});

export default router;
