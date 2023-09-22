import { HttpStatus } from "@lib/http"

export interface Exception {
  status: (typeof HttpStatus)[keyof typeof HttpStatus]
  message: string
  detail: string
}

export const UnauthorizedException = {
  status: HttpStatus.Unauthorized,
  message: "Unauthorized",
  detail: "You need to be authorized to this resource."
} satisfies Exception
