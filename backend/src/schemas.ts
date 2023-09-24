import { z } from "zod"

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().positive().max(100).optional().default(15)
})
export type TPaginationSchema = z.infer<typeof PaginationSchema>
