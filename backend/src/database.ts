import { BaseEntity, DataSource, PrimaryGeneratedColumn } from "typeorm"

import { settings } from "~/settings"

export const dataSource = new DataSource({
  type: "postgres",

  url: `postgres://${settings.DB_USER}:${settings.DB_PASSWORD}@${settings.DB_HOST}:${settings.DB_PORT}/${settings.DB_NAME}`,
  host: settings.DB_HOST,
  port: settings.DB_PORT,
  database: settings.DB_NAME,
  username: settings.DB_USER,
  password: settings.DB_PASSWORD,

  entities: [settings.DB_ENTITIES],

  logger: "file",
  logging: settings.DB_LOGGING,
  synchronize: settings.DB_SYNCHRONIZE,

  useUTC: true
})

export abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
}

export type ExtractModel<T> = Pick<T, Exclude<keyof T, keyof BaseEntity>>
