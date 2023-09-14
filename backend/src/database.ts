import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { settings } from "~/settings"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",

        host: settings.DB_HOST,
        port: settings.DB_PORT,
        database: settings.DB_NAME,
        username: settings.DB_USER,
        password: settings.DB_PASSWORD,

        autoLoadEntities: true,
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {}
