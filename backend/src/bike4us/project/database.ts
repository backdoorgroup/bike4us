import { TypeOrmModule } from "@nestjs/typeorm"

import { settings } from "bike4us/project/settings"

export const DatabaseModule = TypeOrmModule.forRoot({
  type: "postgres",

  host: settings.DB_HOST,
  port: settings.DB_PORT,
  username: settings.DB_USER,
  password: settings.DB_PASSWORD,
  database: settings.DB_NAME,

  entities: ["**/models.ts"],

  migrations: ["src/bike4us/project/migrations/*.ts"],
  migrationsTableName: "migration"
})
