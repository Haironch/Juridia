/**
 * seed-admin.ts
 * Promueve a SUPER_ADMIN a un usuario existente por email.
 *
 * Uso:
 *   npx ts-node -r dotenv/config src/scripts/seed-admin.ts <email>
 *
 * Ejemplo:
 *   npx ts-node -r dotenv/config src/scripts/seed-admin.ts chavezhairon360@gmail.com
 */

import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.error('❌  Debes proporcionar un email como argumento.');
  console.error('    Uso: npx ts-node -r dotenv/config src/scripts/seed-admin.ts <email>');
  process.exit(1);
}

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  const result = await db.execute({
    sql: `SELECT id, email, rol FROM usuarios WHERE email = ? LIMIT 1`,
    args: [email.toLowerCase().trim()],
  });

  if (result.rows.length === 0) {
    console.error(`❌  No se encontró ningún usuario con el correo: ${email}`);
    console.error('    Asegúrate de registrarte primero en la plataforma.');
    process.exit(1);
  }

  const user = result.rows[0] as any;
  console.log(`\n✅  Usuario encontrado:`);
  console.log(`    ID:    ${user.id}`);
  console.log(`    Email: ${user.email}`);
  console.log(`    Rol actual: ${user.rol}`);

  if (user.rol === 'SUPER_ADMIN') {
    console.log('\n⚡  Este usuario ya es SUPER_ADMIN. No se realizaron cambios.');
    process.exit(0);
  }

  const now = new Date().toISOString();
  await db.execute({
    sql: `UPDATE usuarios SET rol = 'SUPER_ADMIN', updatedAt = ? WHERE id = ?`,
    args: [now, user.id],
  });

  console.log('\n🚀  ¡Listo! El usuario ha sido promovido a SUPER_ADMIN.');
  console.log('    Ya puede acceder al panel en /admin/login\n');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
