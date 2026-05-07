import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: `${env("TURSO_DATABASE_URL")}?authToken=${env("TURSO_AUTH_TOKEN")}`,
  },
});
