import type { Request, Response, NextFunction } from "express"
import type { UserRecord } from "firebase-admin/auth"

import { HttpStatus } from "lib/helpers"

import { auth } from "src/auth/services"

export const identity = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.header("authorization") as string
    const token = header.replace("Bearer", "").trim()

    const decodedToken = await auth.verifyIdToken(token)
    const user = await auth.getUser(decodedToken.uid)

    req.user = user
  } catch (error) {
    req.user = {} as UserRecord
  }

  return next()
}

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
  const user = req.user

  if (user?.uid) {
    return next()
  }

  res.status(HttpStatus.Unauthorized).json({ message: "Unauthorized" })

  return next()
}
