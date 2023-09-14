import type { UserRecord } from "firebase-admin/auth"

declare global {
  namespace Express {
    export interface Request {
      user: UserRecord | object
    }
  }
}

export {}
