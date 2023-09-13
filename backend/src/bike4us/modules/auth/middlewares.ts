import type { Request, Response, NextFunction } from "express"
import { Injectable, NestMiddleware } from "@nestjs/common"

import { auth } from "bike4us/modules/auth/services"

/* TODO: melhorar isso pra cobrir os casos de: identificação e rota protegida */
@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.header("authorization")
    const token = header?.replace("Bearer", "")?.trim()

    if (!token) {
      req.user = {}

      next()

      return
    }

    try {
      const decodedToken = await auth.verifyIdToken(token)
      const user = await auth.getUser(decodedToken.uid)

      req.user = user
    } catch (e) {
      req.user = {}
    }

    next()
  }
}
