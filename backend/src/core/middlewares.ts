import type { RequestHandler } from "express"
import type { UserRecord } from "firebase-admin/auth"
import multer from "multer"
import crypto from "crypto"

import type { TAllowedMimetypes } from "~/core/constants"
import { AllowedMimetypes, MaxFileSize, MaxFiles } from "~/core/constants"
import { getUser, verifyIdToken } from "~/core/services"

import { UnauthorizedException } from "~/exceptions"
import { settings } from "~/settings"

import { HttpStatus } from "@/http"

export const upload = multer({
  fileFilter: (_req, file, callback) => {
    if (!AllowedMimetypes.includes(file.mimetype as TAllowedMimetypes)) {
      callback(null, false)
    }

    callback(null, true)
  },

  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, settings.EXPRESS_STATIC)
    },

    filename: (_req, file, cb) => {
      const extension = file.mimetype.split("/").at(1)
      const uuid = crypto.randomUUID()

      const filename = `${uuid}.${extension}`

      cb(null, filename)
    }
  }),

  limits: {
    fileSize: MaxFileSize,
    files: MaxFiles
  }
})

export const identity = (): RequestHandler => {
  return async function (req, _res, next) {
    try {
      const header = req.header("authorization") as string
      const token = header.replace("Bearer", "").trim()

      const decodedToken = await verifyIdToken(token)
      const user = await getUser(decodedToken.uid)

      req.user = user
    } catch (error) {
      req.user = {} as UserRecord
    }

    next()
  }
}

export const authenticated = (): RequestHandler => {
  return function (req, res, next) {
    const user = req.user

    if (!user?.uid) return res.status(HttpStatus.Unauthorized).json(UnauthorizedException)

    next()
  }
}
