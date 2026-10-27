# Juridia

Plataforma educativa de derecho para estudiantes y academias: cursos con lecciones y evaluación final, quizzes de derecho constitucional, exámenes simulados, casos prácticos, foros y herramientas legales.

Demo: https://juridia-eta.vercel.app

## Funcionalidades
- **Cursos:** lecciones, evaluación final y seguimiento de progreso.
- **Planes de estudio:** generación de planes en PDF.
- **ConstituQuiz:** modo estudio, modo práctica y resultados por tema, con tarjetas de repaso.
- **Exámenes simulados** y **casos prácticos** con detalle por caso.
- **Foros** de discusión.
- **Material de estudio:** glosario jurídico, línea de tiempo y documentos.
- **Herramientas:** calculadora de liquidación laboral y generador de documentos legales.
- **Asistente:** chatbot y mascota guía (Lex).
- **Cuentas:** registro, inicio de sesión, recuperación de contraseña y rutas protegidas.
- **Panel de administración:** gestión de cursos y usuarios.

## Stack
| Capa | Tecnología |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Zustand, Zod |
| Backend | Node.js, Express, TypeScript, JWT, bcrypt, Helmet, rate limiting |
| Datos | Prisma con Turso (libSQL), Supabase |
| Despliegue | Vercel (frontend) y Render (API) |

## Estructura
```
client/     Frontend React + Vite
server/     API REST en Express (auth, cursos, planes, foros, admin)
database/   Esquema Prisma, migraciones y seed
```

## Cómo correrlo en local
Requisitos: Node.js 20 o superior.

```bash
# API
cd server
cp .env.example .env      # completar TURSO_DATABASE_URL, TURSO_AUTH_TOKEN y JWT_SECRET
npm install
npm run dev

# Frontend (en otra terminal)
cd client
npm install
npm run dev
```

## Autor
Hairon Yác Chávez – [GitHub](https://github.com/Haironch) · [Portafolio](https://hairon.netlify.app)
