import { z } from "zod"

import { PaginationSchema } from "@/schemas"

export const CreateListingSchema = z.object({
  ownerUid: z.string().uuid(),
  description: z.string().min(1).max(2048),
  title: z.string().min(1).max(128),
  hourPricing: z.number().int().positive()
})
export type TCreateListingSchema = z.infer<typeof CreateListingSchema>

export const GetListingsSchema = PaginationSchema.extend({})
export type TGetListingsSchema = z.infer<typeof GetListingsSchema>

export const GetListingSchema = z.object({
  id: z.coerce.number().int().positive()
})
export type TGetListingSchema = z.infer<typeof GetListingSchema>
