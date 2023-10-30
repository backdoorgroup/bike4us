import { z } from "zod"

import { PaginationSchema } from "@/schemas"

import {
  ListingConditionEnum,
  ListingFrameSizeEnum,
  ListingMaterialEnum,
  ListingWheelSizeEnum,
  ListingTypeEnum
} from "@/listings/constants"

export const CreateListingSchema = z.object({
  ownerUid: z.string().min(1).max(128),
  description: z.string().min(1).max(2048).optional(),
  title: z.string().min(1).max(128),
  hourPricing: z.coerce.number().int().positive(),
  picturePath: z.string().min(1).max(512),
  brand: z.string().min(1).max(512),
  condition: z.nativeEnum(ListingConditionEnum),
  type: z.nativeEnum(ListingTypeEnum),
  material: z.nativeEnum(ListingMaterialEnum),
  wheelSize: z.nativeEnum(ListingWheelSizeEnum),
  frameSize: z.nativeEnum(ListingFrameSizeEnum)
})
export type TCreateListingSchema = z.infer<typeof CreateListingSchema>

export const GetListingsSchema = PaginationSchema.extend({})

export const GetListingSchema = z.object({
  id: z.coerce.number().int().positive()
})
