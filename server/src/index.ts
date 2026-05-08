import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cursosRoutes from './routes/cursos.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Juridia API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/cursos', cursosRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Ambiente: ${process.env.NODE_ENV}`);

  // Auto-ping cada 10 min para evitar sleep en Render free tier
  if (process.env.NODE_ENV === 'production' && process.env.RENDER_EXTERNAL_URL) {
    const url = `${process.env.RENDER_EXTERNAL_URL}/health`;
    setInterval(async () => {
      try {
        await fetch(url);
        console.log(`[keep-alive] ping ok`);
      } catch {
        console.log(`[keep-alive] ping fallido`);
      }
    }, 10 * 60 * 1000);
  }
});
