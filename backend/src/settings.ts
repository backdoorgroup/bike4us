export const settings = {
  // Express
  EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT!) || 8000,
  EXPRESS_MODE: process.env.EXPRESS_MODE || "dev",

  // Database
  DB_NAME: process.env.DB_NAME || "postgres",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT!) || 5432,

  // Firebase
  FB_PROJECT_ID: process.env.FB_PROJECT_ID,
  FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY
} as const
