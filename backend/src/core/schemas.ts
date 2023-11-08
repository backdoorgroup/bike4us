import { z } from "zod"

import { PaginationSchema } from "@/schemas"

import {
  ListingConditionEnum,
  ListingFrameSizeEnum,
  ListingMaterialEnum,
  ListingWheelSizeEnum,
  ListingTypeEnum
} from "@/core/constants"

export const FileSchema = z.object({
  destination: z.string().min(1),
  fieldname: z.string().min(1),
  filename: z.string().min(1),
  mimetype: z.string().min(1),
  originalname: z.string().min(1),
  path: z.string().min(1),
  size: z.number().min(1)
})

export const CreateListingSchema = z.object({
  ownerUid: z.string().min(1).max(128),
  description: z.string().max(2048).optional(),
  title: z.string().min(1).max(128),
  hourPricing: z.coerce.number().int().positive(),
  pictures: z.array(FileSchema).min(1).max(5),
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

export const SearchListingsSchema = PaginationSchema.extend({
  query: z.string().min(1).max(512)
})
