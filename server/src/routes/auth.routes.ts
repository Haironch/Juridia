import { Router } from 'express';
import { registro, login } from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/registro
router.post('/registro', registro);

// POST /api/auth/login
router.post('/login', login);

export default router;
