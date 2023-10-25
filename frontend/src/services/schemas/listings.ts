import { z } from "zod"

// TODO: colocar validação nas enumerações
export const Listing = z.object({
  id: z.number(),
  ownerUid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  hourPricing: z.number(),
  status: z.string(),
  picturePath: z.string(),
  brand: z.string(),
  condition: z.string(),
  type: z.string(),
  frameSize: z.string(),
  wheelSize: z.string(),
  material: z.string()
})
export type TListing = z.infer<typeof Listing>

export const Listings = z.array(Listing)
export type TListings = z.infer<typeof Listings>

export const ListingResponse = z.object({
  listings: Listings
})
