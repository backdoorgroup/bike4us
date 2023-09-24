import { z } from "zod"

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().min(1).optional().default(1),
  perPage: z.coerce.number().int().positive().min(1).max(100).optional().default(15)
})
export type TPaginationSchema = z.infer<typeof PaginationSchema>
