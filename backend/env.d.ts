import type { UserRecord } from "firebase-admin/auth"

export {}

declare global {
  namespace Express {
    export interface Request {
      user: UserRecord | null
    }
  }
}
