import { TypeOrmModule } from "@nestjs/typeorm"

import { settings } from "~/settings"

export const DatabaseModule = TypeOrmModule.forRoot({
  type: "postgres",

  host: settings.DB_HOST,
  port: settings.DB_PORT,
  username: settings.DB_USER,
  password: settings.DB_PASSWORD,
  database: settings.DB_NAME,

  entities: ["**/models.{js,ts}"],

  migrationsTableName: "migration",

  migrations: ["src/migrations/*.ts"],

  synchronize: settings.NEST_MODE === "dev",
  ssl: settings.NEST_MODE === "prod"
})
