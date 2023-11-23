import path from "path"

const env = process.env

export const settings = {
  // Express
  get EXPRESS_PORT() {
    return parseInt(env.EXPRESS_PORT!) || 8000
  },
  get EXPRESS_HOST() {
    return env.EXPRESS_HOST || "0.0.0.0"
  },
  get EXPRESS_MODE() {
    return env.EXPRESS_MODE || "dev"
  },
  get EXPRESS_DEV() {
    return settings.EXPRESS_MODE === "dev"
  },
  get EXPRESS_PROD() {
    return settings.EXPRESS_MODE === "prod"
  },
  get EXPRESS_ROOT() {
    return __dirname
  },
  get EXPRESS_STATIC() {
    return path.join(this.EXPRESS_ROOT, "..", "static")
  },

  // Database Connection
  get DB_NAME() {
    return env.DB_NAME || "postgres"
  },
  get DB_USER() {
    return env.DB_USER || "postgres"
  },
  get DB_PASSWORD() {
    return env.DB_PASSWORD || "postgres"
  },
  get DB_HOST() {
    return env.DB_HOST || "localhost"
  },
  get DB_PORT() {
    return parseInt(env.DB_PORT!) || 5432
  },

  // Database Configuration
  get DB_SYNCHRONIZE() {
    return settings.EXPRESS_DEV
  },
  get DB_LOGGING() {
    return settings.EXPRESS_DEV
  },

  // Firebase
  get FB_PROJECT_ID() {
    return env.FB_PROJECT_ID
  },
  get FB_CLIENT_EMAIL() {
    return env.FB_CLIENT_EMAIL
  },
  get FB_PRIVATE_KEY() {
    return env.FB_PRIVATE_KEY
  }
} as const
