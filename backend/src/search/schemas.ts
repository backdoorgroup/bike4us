import { z } from "zod"

import { PaginationSchema } from "@/schemas"

export const SearchListingsSchema = PaginationSchema.extend({
  query: z.string().min(1).max(512)
})
