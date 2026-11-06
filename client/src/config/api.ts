// URL base de la API. En producción viene de VITE_API_URL (.env.production);
// en local apunta al server de Express (PORT=5001 en server/.env.example).
export const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:5001';
