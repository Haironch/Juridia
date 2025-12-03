export type RolUsuario = 
  | 'SUPER_ADMIN'
  | 'ADMIN_CONTENIDO'
  | 'TUTOR'
  | 'PREMIUM'
  | 'FREE';

export interface Usuario {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
  rol: RolUsuario;
  fechaRegistro: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: Usuario;
    token: string;
  };
}

export interface Pregunta {
  id: string;
  texto: string;
  dificultad: number;
  opciones: OpcionRespuesta[];
}

export interface OpcionRespuesta {
  id: string;
  texto: string;
  esCorrecta: boolean;
}
