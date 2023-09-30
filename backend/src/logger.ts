import winston from "winston"

const { combine, timestamp, colorize, align, printf } = winston.format

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
} as const

export const logger = winston.createLogger({
  level: "http",
  levels,
  transports: [new winston.transports.Console()],
  format: combine(
    timestamp({
      format: "DD-MM-YYYY hh:mm:ss.SSSS ZZ"
    }),
    align(),
    colorize(),
    printf((message) => `[${message.timestamp}] ${message.level}: ${message.message}`)
  )
})
