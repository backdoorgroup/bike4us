export const settings = {
  DB_NAME: process.env.DB_NAME || "rentabike",
  DB_USER: process.env.DB_USER || "rentabike",
  DB_PASSWORD: process.env.DB_PASSWORD || "rentabike",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432
} as const
