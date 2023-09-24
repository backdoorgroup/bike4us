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

export const BadRequestException = {
  status: HttpStatus.BadRequest,
  message: "Bad Request",
  detail: "Some of the data that you have sent is invalid."
} satisfies Exception

export const NotFoundException = {
  status: HttpStatus.NotFound,
  message: "Not Found",
  detail: "The resource that you are looking for does not exist."
} satisfies Exception
