import type { Request, Response, NextFunction } from "express"

import { auth } from "~/auth/services"

/* TODO: melhorar isso pra cobrir os casos de: identificação e rota protegida */
export const identity = async function (req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization")
  const token = header?.replace("Bearer", "")?.trim()

  if (!token) {
    req.user = {}

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
