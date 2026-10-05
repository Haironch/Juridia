import { Response, NextFunction } from 'express';
import { AuthRequest, RolUsuario } from '../types';
import { supabaseAdmin } from '../config/supabase';
import { db } from '../config/database';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      res.status(401).json({ error: 'Token inválido' });
      return;
    }

    // Buscar perfil en Turso para obtener rol y datos extra
    const result = await db.execute({
      sql: 'SELECT id, email, rol FROM usuarios WHERE id = ? LIMIT 1',
      args: [data.user.id],
    });

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Perfil de usuario no encontrado' });
      return;
    }

    const perfil = result.rows[0] as any;
    req.user = { id: perfil.id, email: perfil.email, rol: perfil.rol as RolUsuario };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const authorize = (...roles: RolUsuario[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }
    if (!roles.includes(req.user.rol)) {
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }
    next();
  };
};
