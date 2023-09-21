const env = process.env

export const settings = {
  // Express
  EXPRESS_PORT: parseInt(env.EXPRESS_PORT!) || 8000,
  EXPRESS_HOST: env.EXPRESS_HOST || "0.0.0.0",
  EXPRESS_MODE: env.EXPRESS_MODE || "dev",

  // Database
  DB_NAME: env.DB_NAME || "postgres",
  DB_USER: env.DB_USER || "postgres",
  DB_PASSWORD: env.DB_PASSWORD || "postgres",
  DB_HOST: env.DB_HOST || "localhost",
  DB_PORT: parseInt(env.DB_PORT!) || 5432,

  // Firebase
  FB_PROJECT_ID: env.FB_PROJECT_ID,
  FB_CLIENT_EMAIL: env.FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY: env.FB_PRIVATE_KEY
} as const
