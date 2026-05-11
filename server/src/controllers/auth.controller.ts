import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { db } from '../config/database';

const isProd = process.env.NODE_ENV === 'production';
const safeError = (err: unknown) =>
  isProd ? 'Error interno del servidor' : (err as Error).message;

// ── Schemas de validación ────────────────────────────────────────────────────

const registroSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar 50 caracteres'),
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede superar 50 caracteres'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100),
});

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido').toLowerCase().trim(),
  password: z.string().min(1, 'La contraseña es requerida'),
});

// ── POST /api/auth/registro ──────────────────────────────────────────────────

export const registro = async (req: Request, res: Response) => {
  const parsed = registroSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const { nombre, apellido, email, password } = parsed.data;

  try {
    // Verificar email duplicado
    const existing = await db.execute({
      sql: 'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
      args: [email],
    });

    if (existing.rows.length > 0) {
      res.status(409).json({
        ok: false,
        error: 'Ya existe una cuenta registrada con ese correo electrónico.',
      });
      return;
    }

    // Hash de contraseña
    const passwordHash = await bcrypt.hash(password, 12);
    const id = randomUUID();
    const now = new Date().toISOString();

    await db.execute({
      sql: `INSERT INTO usuarios
              (id, email, password_hash, nombre, apellido, rol, estado, fecha_registro, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, 'FREE', 'ACTIVO', ?, ?, ?)`,
      args: [id, email, passwordHash, nombre, apellido, now, now, now],
    });

    const token = jwt.sign(
      { id, email, rol: 'FREE' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      ok: true,
      data: {
        token,
        user: { id, email, nombre, apellido, rol: 'FREE' },
      },
    });
  } catch (err) {
    console.error('[POST /auth/registro]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
};

// ── POST /api/auth/login ─────────────────────────────────────────────────────

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0].message });
    return;
  }

  const { email, password } = parsed.data;

  try {
    const result = await db.execute({
      sql: `SELECT id, email, password_hash, nombre, apellido, rol, estado
            FROM usuarios WHERE email = ? LIMIT 1`,
      args: [email],
    });

    if (result.rows.length === 0) {
      res.status(401).json({ ok: false, error: 'Correo o contraseña incorrectos.' });
      return;
    }

    const user = result.rows[0] as any;

    if (user.estado === 'SUSPENDIDO') {
      res.status(403).json({
        ok: false,
        error: 'Tu cuenta ha sido suspendida. Contacta con soporte.',
      });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password_hash as string);
    if (!isValid) {
      res.status(401).json({ ok: false, error: 'Correo o contraseña incorrectos.' });
      return;
    }

    // Actualizar último acceso
    const now = new Date().toISOString();
    await db.execute({
      sql: 'UPDATE usuarios SET ultimo_acceso = ?, updatedAt = ? WHERE id = ?',
      args: [now, now, user.id],
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      ok: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          rol: user.rol,
        },
      },
    });
  } catch (err) {
    console.error('[POST /auth/login]', err);
    res.status(500).json({ ok: false, error: safeError(err) });
  }
};
