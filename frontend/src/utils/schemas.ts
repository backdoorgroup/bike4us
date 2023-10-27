import { z } from "zod"

export const extractEnum = <T extends string>(object: Record<T, unknown>) => {
  const [left, ...right] = Object.keys(object) as T[]

  return z.enum([left, ...right])
}
