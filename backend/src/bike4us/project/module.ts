import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { DatabaseModule } from "bike4us/project/database"
import { IdentityMiddleware } from "bike4us/modules/users/middlewares"

@Module({
  imports: [DatabaseModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdentityMiddleware).forRoutes("*")
  }
}
