import path from "path"
import { BaseEntity, DataSource, PrimaryGeneratedColumn } from "typeorm"

import { settings } from "@/settings"

export const dataSource = new DataSource({
  type: "postgres",

  url: `postgres://${settings.DB_USER}:${settings.DB_PASSWORD}@${settings.DB_HOST}:${settings.DB_PORT}/${settings.DB_NAME}`,
  host: settings.DB_HOST,
  port: settings.DB_PORT,
  database: settings.DB_NAME,
  username: settings.DB_USER,
  password: settings.DB_PASSWORD,

  entities: [path.join(__dirname, "**/models.{ts,js}")],

  logger: "file",
  logging: settings.EXPRESS_DEV,
  synchronize: settings.EXPRESS_DEV,
  dropSchema: settings.DB_DROP_SCHEMA,

  ssl: settings.EXPRESS_PROD,
  useUTC: true
})

export class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
}
