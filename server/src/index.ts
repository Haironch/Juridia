import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cursosRoutes from './routes/cursos.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import forosRoutes from './routes/foros.routes';

dotenv.config();

// ── Startup validation ────────────────────────────────────────────────────────
const REQUIRED_ENV = ['JWT_SECRET', 'TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(`[startup] Variables de entorno faltantes: ${missing.join(', ')}`);
  process.exit(1);
}

if (process.env.JWT_SECRET!.length < 32) {
  console.error('[startup] JWT_SECRET debe tener al menos 32 caracteres.');
  process.exit(1);
}

// ── App ───────────────────────────────────────────────────────────────────────
const app: Application = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()) ?? [];

if (isProd && allowedOrigins.length === 0) {
  console.error('[startup] ALLOWED_ORIGINS no configurado en producción.');
  process.exit(1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir peticiones sin origen (Postman, curl, same-origin server calls)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origen no permitido — ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Security headers (Helmet) ─────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false, // La API es JSON-only; CSP aplica en frontend
  })
);

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));   // Previene payloads gigantes
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Límite general: 100 req / 15 min por IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
});

// Límite estricto para rutas de autenticación: 10 req / 15 min por IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' },
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Juridia API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/foros', forosRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ ok: false, error: 'Endpoint no encontrado' });
});

// ── Error handler global ──────────────────────────────────────────────────────
// En producción nunca expone el mensaje interno del error
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[error]', err.stack ?? err.message);
  const message = isProd ? 'Error interno del servidor' : err.message;
  res.status(500).json({ ok: false, error: message });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Ambiente: ${process.env.NODE_ENV}`);

  if (isProd && process.env.RENDER_EXTERNAL_URL) {
    const url = `${process.env.RENDER_EXTERNAL_URL}/health`;
    setInterval(async () => {
      try {
        await fetch(url);
        console.log('[keep-alive] ping ok');
      } catch {
        console.log('[keep-alive] ping fallido');
      }
    }, 10 * 60 * 1000);
  }
});
