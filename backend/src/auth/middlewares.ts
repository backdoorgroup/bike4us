import type { Request, Response, NextFunction } from "express"
import { Injectable, NestMiddleware } from "@nestjs/common"

import { auth } from "~/auth/services"

/* TODO: melhorar isso pra cobrir os casos de: identificação e rota protegida */
/* TODO: a estrutura do projeto tá muito inflada pra o que vai ser no final do dia, é necessário simplificar */
@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.header("authorization")
    const token = header?.replace("Bearer", "")?.trim()

    if (!token) {
      req.user = {}

      // TODO: checar se esse return next() é necessário
      return next()
    }

    try {
      const decodedToken = await auth.verifyIdToken(token)
      const user = await auth.getUser(decodedToken.uid)

      req.user = user
    } catch (e) {
      req.user = {}
    }

    return next()
  }
}
