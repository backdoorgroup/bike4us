import type { PrettyOptions } from "pino-pretty"
import pino from "pino"

const prettyOptions: PrettyOptions = {
  translateTime: "SYS:standard",
  ignore: "pid,hostname"
}

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: prettyOptions
  }
})
