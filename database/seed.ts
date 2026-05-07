import "dotenv/config";
import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const ADMIN_ID = randomUUID();

const categorias = [
  { id: randomUUID(), nombre: "Derecho Constitucional", icono: "⚖️", orden: 1 },
  { id: randomUUID(), nombre: "Derecho Penal", icono: "🔒", orden: 2 },
  { id: randomUUID(), nombre: "Derecho Civil", icono: "📜", orden: 3 },
  { id: randomUUID(), nombre: "Derecho Laboral", icono: "👷", orden: 4 },
  { id: randomUUID(), nombre: "Derecho Mercantil", icono: "🏢", orden: 5 },
  { id: randomUUID(), nombre: "General", icono: "📚", orden: 6 },
];

const cursos = [
  {
    id: randomUUID(),
    categoriaIdx: 5,
    titulo: "Introducción al Derecho",
    descripcion: "Fundamentos del sistema jurídico guatemalteco. El punto de partida para todo estudiante de derecho.",
    nivel: "Básico",
    duracion: "4 semanas",
    esPremium: 0,
    publicado: 1,
    modulos: [
      { orden: 1, titulo: "¿Qué es el Derecho?", contenido: "Concepto, ramas y fuentes del derecho guatemalteco. Diferencia entre derecho público y privado.", duracion: 45 },
      { orden: 2, titulo: "El Sistema Jurídico Guatemalteco", contenido: "Estructura del ordenamiento legal. Jerarquía normativa según la Constitución. La pirámide de Kelsen aplicada a Guatemala.", duracion: 60 },
      { orden: 3, titulo: "Las Personas en el Derecho", contenido: "Persona individual y jurídica. Capacidad legal. Derechos y obligaciones fundamentales.", duracion: 50 },
      { orden: 4, titulo: "Fuentes del Derecho", contenido: "La ley, la costumbre, la jurisprudencia y la doctrina. Cómo se crean y aplican las normas en Guatemala.", duracion: 55 },
    ],
  },
  {
    id: randomUUID(),
    categoriaIdx: 1,
    titulo: "Derecho Civil — Obligaciones y Contratos",
    descripcion: "Domina las obligaciones civiles y los contratos más utilizados en la práctica legal guatemalteca.",
    nivel: "Básico",
    duracion: "6 semanas",
    esPremium: 0,
    publicado: 1,
    modulos: [
      { orden: 1, titulo: "Las Obligaciones Civiles", contenido: "Definición, elementos y clasificación de las obligaciones. Obligaciones naturales vs. civiles.", duracion: 60 },
      { orden: 2, titulo: "Fuentes de las Obligaciones", contenido: "Contratos, cuasicontratos, delitos y cuasidelitos como fuentes de obligación legal.", duracion: 55 },
      { orden: 3, titulo: "El Contrato", contenido: "Elementos esenciales: consentimiento, objeto y causa. Contratos nominados e innominados según el Código Civil.", duracion: 70 },
      { orden: 4, titulo: "Contratos en Particular", contenido: "Compraventa, arrendamiento, donación y préstamo. Análisis de cada uno con ejemplos prácticos.", duracion: 80 },
      { orden: 5, titulo: "Nulidad e Incumplimiento", contenido: "Causas de nulidad absoluta y relativa. Daños y perjuicios. Resolución de contratos.", duracion: 65 },
    ],
  },
  {
    id: randomUUID(),
    categoriaIdx: 0,
    titulo: "Derecho Constitucional",
    descripcion: "Estudia la Constitución Política de Guatemala, sus principios fundamentales y garantías constitucionales.",
    nivel: "Avanzado",
    duracion: "10 semanas",
    esPremium: 1,
    publicado: 1,
    modulos: [
      { orden: 1, titulo: "La Constitución de 1985", contenido: "Historia y contexto. Estructura general. Supremacía constitucional y rigidez normativa.", duracion: 70 },
      { orden: 2, titulo: "Derechos Individuales", contenido: "Artículos 4-32. Libertad, igualdad, vida y dignidad. Garantías procesales constitucionales.", duracion: 80 },
      { orden: 3, titulo: "Derechos Sociales", contenido: "Familia, cultura, educación, trabajo y salud en la Constitución. El Estado de bienestar guatemalteco.", duracion: 75 },
      { orden: 4, titulo: "Organismo Legislativo", contenido: "El Congreso de la República. Proceso de formación y sanción de leyes. Control parlamentario.", duracion: 65 },
      { orden: 5, titulo: "Organismo Ejecutivo", contenido: "El Presidente y Vicepresidente. Ministros y secretarías. Funciones y límites del poder ejecutivo.", duracion: 70 },
      { orden: 6, titulo: "Organismo Judicial", contenido: "Corte Suprema de Justicia. Corte de Constitucionalidad. Amparo, exhibición personal y constitucionalidad.", duracion: 90 },
    ],
  },
  {
    id: randomUUID(),
    categoriaIdx: 3,
    titulo: "Derecho Laboral",
    descripcion: "Conoce los derechos y obligaciones en las relaciones de trabajo según el Código de Trabajo guatemalteco.",
    nivel: "Intermedio",
    duracion: "7 semanas",
    esPremium: 1,
    publicado: 1,
    modulos: [
      { orden: 1, titulo: "Principios del Derecho Laboral", contenido: "Principios tutelares: in dubio pro operario, irrenunciabilidad e imperatividad. Fuentes del derecho del trabajo.", duracion: 60 },
      { orden: 2, titulo: "El Contrato Individual de Trabajo", contenido: "Elementos, tipos y requisitos. Período de prueba. Derechos mínimos irrenunciables del trabajador.", duracion: 75 },
      { orden: 3, titulo: "Jornadas y Descansos", contenido: "Tipos de jornada laboral. Horas extras. Descansos semanales y días de asueto según la ley.", duracion: 55 },
      { orden: 4, titulo: "Salario y Prestaciones", contenido: "Salario mínimo. Bonificaciones. Aguinaldo, bono 14 y vacaciones. Indemnización por despido.", duracion: 80 },
      { orden: 5, titulo: "Terminación del Contrato", contenido: "Causas justas de despido. Renuncia voluntaria. Procedimiento para reclamar prestaciones laborales.", duracion: 70 },
    ],
  },
  {
    id: randomUUID(),
    categoriaIdx: 2,
    titulo: "Derecho Penal Guatemalteco",
    descripcion: "Domina los fundamentos del derecho penal, desde delitos hasta procedimientos judiciales en Guatemala.",
    nivel: "Intermedio",
    duracion: "8 semanas",
    esPremium: 1,
    publicado: 1,
    modulos: [
      { orden: 1, titulo: "Teoría del Delito", contenido: "Acción, tipicidad, antijuridicidad y culpabilidad. El delito y la falta. Elementos del tipo penal.", duracion: 80 },
      { orden: 2, titulo: "El Código Penal de Guatemala", contenido: "Estructura del Decreto 17-73. Parte general y especial. Principales delitos tipificados.", duracion: 70 },
      { orden: 3, titulo: "Las Penas", contenido: "Tipos de penas en Guatemala. Medidas de seguridad. Extinción de la responsabilidad penal.", duracion: 65 },
      { orden: 4, titulo: "El Proceso Penal", contenido: "Etapas del proceso: preparatoria, intermedia y debate. El Ministerio Público y la defensa pública.", duracion: 90 },
      { orden: 5, titulo: "Delitos Contra la Vida", contenido: "Homicidio, asesinato y parricidio. Circunstancias agravantes y atenuantes. Femicidio.", duracion: 75 },
      { orden: 6, titulo: "Delitos Patrimoniales", contenido: "Hurto, robo, estafa y defraudación. Diferencias y penalidades según el Código Penal.", duracion: 60 },
    ],
  },
  {
    id: randomUUID(),
    categoriaIdx: 4,
    titulo: "Derecho Mercantil",
    descripcion: "Comprende las leyes que regulan las actividades comerciales y empresariales en Guatemala.",
    nivel: "Intermedio",
    duracion: "9 semanas",
    esPremium: 1,
    publicado: 1,
    modulos: [
      { orden: 1, titulo: "El Comerciante y la Empresa", contenido: "Definición de comerciante individual y social. La empresa mercantil. El Registro Mercantil.", duracion: 60 },
      { orden: 2, titulo: "Sociedades Mercantiles", contenido: "Sociedad Anónima, de Responsabilidad Limitada y en Comandita. Constitución y funcionamiento.", duracion: 85 },
      { orden: 3, titulo: "Títulos de Crédito", contenido: "Cheque, pagaré y letra de cambio. Requisitos legales y circulación. Protesto y cobro judicial.", duracion: 70 },
      { orden: 4, titulo: "Contratos Mercantiles", contenido: "Compraventa mercantil, suministro, agencia y franquicia. Diferencias con contratos civiles.", duracion: 75 },
      { orden: 5, titulo: "Propiedad Intelectual", contenido: "Marcas, patentes y derechos de autor en Guatemala. Registro y protección legal.", duracion: 65 },
    ],
  },
];

async function seed() {
  console.log("🌱 Iniciando seed de datos...\n");

  // Admin user
  await db.execute({
    sql: `INSERT OR IGNORE INTO usuarios (id, email, password_hash, nombre, apellido, rol) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [ADMIN_ID, "admin@juridia.gt", "hash_placeholder", "Admin", "Juridia", "SUPER_ADMIN"],
  });
  console.log("  ✅ Usuario admin creado");

  // Categorias
  for (const cat of categorias) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO categorias_derecho (id, nombre, icono, orden) VALUES (?, ?, ?, ?)`,
      args: [cat.id, cat.nombre, cat.icono, cat.orden],
    });
  }
  console.log("  ✅ Categorías creadas");

  // Cursos y módulos
  for (const curso of cursos) {
    const categoriaId = categorias[curso.categoriaIdx].id;
    await db.execute({
      sql: `INSERT OR IGNORE INTO cursos (id, creador_id, categoria_id, titulo, descripcion, nivel, duracion, es_premium, publicado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [curso.id, ADMIN_ID, categoriaId, curso.titulo, curso.descripcion, curso.nivel, curso.duracion, curso.esPremium, curso.publicado],
    });

    for (const modulo of curso.modulos) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO modulos_curso (id, curso_id, orden, titulo, contenido, duracion_estimada) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [randomUUID(), curso.id, modulo.orden, modulo.titulo, modulo.contenido, modulo.duracion],
      });
    }
    console.log(`  ✅ Curso: ${curso.titulo}`);
  }

  console.log("\n✨ Seed completado exitosamente.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Error en seed:", e);
  process.exit(1);
});
