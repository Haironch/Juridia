import "dotenv/config";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const tablas = [
  `CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nombre TEXT,
    apellido TEXT,
    rol TEXT NOT NULL DEFAULT 'FREE',
    estado TEXT NOT NULL DEFAULT 'ACTIVO',
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso DATETIME,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS categorias_derecho (
    id TEXT PRIMARY KEY,
    nombre TEXT UNIQUE NOT NULL,
    descripcion TEXT,
    icono TEXT,
    orden INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS cursos (
    id TEXT PRIMARY KEY,
    creador_id TEXT NOT NULL,
    categoria_id TEXT NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    nivel TEXT NOT NULL DEFAULT 'Básico',
    duracion TEXT,
    es_premium INTEGER NOT NULL DEFAULT 1,
    precio REAL DEFAULT 0,
    publicado INTEGER NOT NULL DEFAULT 0,
    thumbnail TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creador_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias_derecho(id)
  )`,

  `CREATE TABLE IF NOT EXISTS modulos_curso (
    id TEXT PRIMARY KEY,
    curso_id TEXT NOT NULL,
    orden INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    contenido TEXT,
    duracion_estimada INTEGER,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS perfiles_tutor (
    id TEXT PRIMARY KEY,
    usuario_id TEXT UNIQUE NOT NULL,
    especialidad TEXT NOT NULL,
    biografia TEXT,
    verificado INTEGER NOT NULL DEFAULT 0,
    contenido_aprobado_count INTEGER NOT NULL DEFAULT 0,
    rating_promedio REAL NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS suscripciones (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    plan TEXT NOT NULL,
    fecha_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    estado TEXT NOT NULL DEFAULT 'ACTIVA',
    stripe_subscription_id TEXT UNIQUE,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS foros (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    categoria_id TEXT NOT NULL,
    titulo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    vistas INTEGER NOT NULL DEFAULT 0,
    cerrado INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias_derecho(id)
  )`,

  `CREATE TABLE IF NOT EXISTS comentarios_foro (
    id TEXT PRIMARY KEY,
    foro_id TEXT NOT NULL,
    usuario_id TEXT NOT NULL,
    contenido TEXT NOT NULL,
    editado INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (foro_id) REFERENCES foros(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`,

  `CREATE TABLE IF NOT EXISTS material_estudio (
    id TEXT PRIMARY KEY,
    creador_id TEXT NOT NULL,
    aprobado_por_id TEXT,
    categoria_id TEXT NOT NULL,
    tipo TEXT NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    url_archivo TEXT NOT NULL,
    es_premium INTEGER NOT NULL DEFAULT 0,
    descargas_count INTEGER NOT NULL DEFAULT 0,
    estado TEXT NOT NULL DEFAULT 'BORRADOR',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creador_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias_derecho(id)
  )`,

  `CREATE TABLE IF NOT EXISTS subcategorias (
    id TEXT PRIMARY KEY,
    categoria_id TEXT NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    orden INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_derecho(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS preguntas (
    id TEXT PRIMARY KEY,
    subcategoria_id TEXT NOT NULL,
    creador_id TEXT NOT NULL,
    aprobada_por_id TEXT,
    categoria_id TEXT NOT NULL,
    texto TEXT NOT NULL,
    tipo TEXT NOT NULL,
    dificultad INTEGER NOT NULL DEFAULT 1,
    explicacion TEXT,
    referencias_legales TEXT,
    estado TEXT NOT NULL DEFAULT 'BORRADOR',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias_derecho(id),
    FOREIGN KEY (creador_id) REFERENCES usuarios(id)
  )`,

  `CREATE TABLE IF NOT EXISTS opciones_respuesta (
    id TEXT PRIMARY KEY,
    pregunta_id TEXT NOT NULL,
    texto TEXT NOT NULL,
    es_correcta INTEGER NOT NULL DEFAULT 0,
    orden INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS progreso_usuario (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    pregunta_id TEXT NOT NULL,
    intentos INTEGER NOT NULL DEFAULT 0,
    acertada INTEGER NOT NULL DEFAULT 0,
    fecha_ultimo_intento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tiempo_respuesta INTEGER,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, pregunta_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS contenido_pendiente (
    id TEXT PRIMARY KEY,
    tutor_id TEXT NOT NULL,
    admin_revisor_id TEXT,
    tipo TEXT NOT NULL,
    contenido_json TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'PENDIENTE',
    comentarios_revision TEXT,
    fecha_revision DATETIME,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tutor_id) REFERENCES usuarios(id)
  )`,

  `CREATE TABLE IF NOT EXISTS actividad_tutores (
    id TEXT PRIMARY KEY,
    tutor_id TEXT NOT NULL,
    tipo_actividad TEXT NOT NULL,
    aprobado INTEGER NOT NULL DEFAULT 0,
    referencia_id TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tutor_id) REFERENCES usuarios(id) ON DELETE CASCADE
  )`,
];

async function setup() {
  console.log("🚀 Creando tablas en Turso...\n");
  for (const sql of tablas) {
    const nombre = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] ?? "?";
    try {
      await db.execute(sql);
      console.log(`  ✅ ${nombre}`);
    } catch (e: any) {
      console.error(`  ❌ ${nombre}: ${e.message}`);
    }
  }
  console.log("\n✨ Setup completado.");
  process.exit(0);
}

setup();
