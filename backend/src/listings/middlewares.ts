import multer from "multer"
import crypto from "crypto"

import type { TAllowedMimetypes } from "@/listings/constants"

import { settings } from "@/settings"
import { AllowedMimetypes, MaxFileSize, MaxFiles } from "@/listings/constants"

export const upload = multer({
  fileFilter: (_req, file, callback) => {
    if (!AllowedMimetypes.includes(file.mimetype as TAllowedMimetypes)) {
      callback(null, false)
    }

    callback(null, true)
  },

  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, settings.EXPRESS_STATIC_PATH)
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
