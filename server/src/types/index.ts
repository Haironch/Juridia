import { Request } from 'express';

export type RolUsuario = 'SUPER_ADMIN' | 'ADMIN_CONTENIDO' | 'TUTOR' | 'PREMIUM' | 'FREE';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    rol: RolUsuario;
    nombre?: string;
    apellido?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
