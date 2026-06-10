-- Planes de estudio personalizados
CREATE TABLE IF NOT EXISTS planes_estudio (
  id TEXT PRIMARY KEY,
  usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  examen TEXT NOT NULL,
  fase TEXT NOT NULL,
  semanas_disponibles INTEGER NOT NULL,
  fecha_examen TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_planes_usuario ON planes_estudio(usuario_id);
CREATE INDEX IF NOT EXISTS idx_planes_created ON planes_estudio(created_at);

-- Semanas del plan
CREATE TABLE IF NOT EXISTS plan_semanas (
  id TEXT PRIMARY KEY,
  plan_id TEXT NOT NULL REFERENCES planes_estudio(id) ON DELETE CASCADE,
  numero_semana INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  recursos TEXT,
  fecha_inicio TEXT,
  fecha_fin TEXT,
  estado TEXT DEFAULT 'pendiente',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_plan_semanas_plan ON plan_semanas(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_semanas_numero ON plan_semanas(plan_id, numero_semana);

-- Progreso en el plan
CREATE TABLE IF NOT EXISTS plan_progreso (
  id TEXT PRIMARY KEY,
  plan_semana_id TEXT NOT NULL REFERENCES plan_semanas(id) ON DELETE CASCADE,
  usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  completado BOOLEAN DEFAULT FALSE,
  porcentaje INTEGER DEFAULT 0,
  ultima_actualizacion TEXT,
  UNIQUE(plan_semana_id, usuario_id)
);

CREATE INDEX IF NOT EXISTS idx_plan_progreso_semana ON plan_progreso(plan_semana_id);
CREATE INDEX IF NOT EXISTS idx_plan_progreso_usuario ON plan_progreso(usuario_id);
