import { z } from "zod"

import { PaginationSchema } from "~/schemas"

import {
  ListingConditionEnum,
  ListingFrameSizeEnum,
  ListingMaterialEnum,
  ListingWheelSizeEnum,
  ListingTypeEnum,
  ListingStatusEnum
} from "~/core/constants"

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

export const GetListingsSchema = PaginationSchema.extend({
  uid: z.string().optional(),
  status: z.nativeEnum(ListingStatusEnum).optional()
})

export const GetListingSchema = z.object({
  id: z.coerce.number().int().positive()
})

export const EditListingSchema = CreateListingSchema.partial()
  .merge(GetListingSchema)
  .omit({ pictures: true, ownerUid: true })
  .extend({
    status: z.nativeEnum(ListingStatusEnum).optional()
  })
export type TEditListingSchema = z.infer<typeof EditListingSchema>

export const SearchListingsSchema = PaginationSchema.extend({
  query: z.string().min(1).max(512)
})

export const GetProfileSchema = z.object({
  uid: z.string().min(1).max(128)
})

export const CreateAddressSchema = z.object({
  city: z.string().min(1).max(64),
  complement: z.string().max(256).optional(),
  neighborhood: z.string().min(1).max(256),
  number: z.string().min(1).max(16),
  ownerUid: z.string().min(1).max(128),
  state: z.string().min(1).max(32),
  street: z.string().min(1).max(256),
  zipcode: z.string().length(8)
})
export type TCreateAddressSchema = z.infer<typeof CreateAddressSchema>
