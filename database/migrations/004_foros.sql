-- Migración 004: Módulo de Foros
-- Ejecutar en Turso: turso db shell <nombre-db> < 004_foros.sql

CREATE TABLE IF NOT EXISTS posts_foro (
  id               TEXT    PRIMARY KEY,
  titulo           TEXT    NOT NULL,
  contenido        TEXT    NOT NULL,
  categoria        TEXT    NOT NULL,
  usuario_id       TEXT    NOT NULL,
  usuario_nombre   TEXT    NOT NULL,
  votos            INTEGER NOT NULL DEFAULT 0,
  vistas           INTEGER NOT NULL DEFAULT 0,
  total_respuestas INTEGER NOT NULL DEFAULT 0,
  resuelto         INTEGER NOT NULL DEFAULT 0,  -- 0 = no, 1 = sí
  fijado           INTEGER NOT NULL DEFAULT 0,  -- 0 = no, 1 = sí (solo admin)
  created_at       TEXT    NOT NULL,
  updated_at       TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS respuestas_foro (
  id             TEXT    PRIMARY KEY,
  post_id        TEXT    NOT NULL REFERENCES posts_foro(id) ON DELETE CASCADE,
  contenido      TEXT    NOT NULL,
  usuario_id     TEXT    NOT NULL,
  usuario_nombre TEXT    NOT NULL,
  votos          INTEGER NOT NULL DEFAULT 0,
  es_solucion    INTEGER NOT NULL DEFAULT 0,  -- 0 = no, 1 = sí
  created_at     TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS votos_foro (
  usuario_id    TEXT NOT NULL,
  referencia_id TEXT NOT NULL,
  tipo_ref      TEXT NOT NULL,  -- 'post' | 'respuesta'
  PRIMARY KEY (usuario_id, referencia_id, tipo_ref)
);

-- Índices para mejorar rendimiento de queries frecuentes
CREATE INDEX IF NOT EXISTS idx_posts_foro_categoria   ON posts_foro(categoria);
CREATE INDEX IF NOT EXISTS idx_posts_foro_created_at  ON posts_foro(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_respuestas_foro_post   ON respuestas_foro(post_id);
CREATE INDEX IF NOT EXISTS idx_votos_foro_usuario     ON votos_foro(usuario_id);
