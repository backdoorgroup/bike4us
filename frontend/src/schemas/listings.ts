import { z } from "zod"

import { env } from "~/env"
import { Address } from "~/schemas"
import { extractEnum } from "~/utils"

export const Condition = {
  "new": "Novo",
  "used-like-new": "Usado - Em estado de novo",
  "used-good": "Usado - Em boas condições",
  "used-fair": "Usado - Em condições razoáveis"
} as const

export const BikeType = {
  mtb: "Mountain Bike (MTB)",
  bmx: "BMX",
  urban: "Bicicleta urbana",
  electric: "Bicicleta elétrica",
  cruiser: "Bicicleta de passeio"
} as const

export const FrameSize = {
  s: '15" - 16" (S)',
  m: '16" - 18" (M)',
  l: '19" (L)',
  xl: '21" (XL)'
} as const

export const WheelSize = {
  "12": '12"',
  "14": '14"',
  "16": '16"',
  "20": '20"',
  "22": '22"',
  "24": '24"',
  "26": '26"',
  "27": '27"',
  "27.5": '27.5"',
  "28": '28"',
  "29": '29"'
} as const

export const Material = {
  "aluminum": "Alumínio",
  "carbon-fiber": "Fibra de Carbono",
  "steel": "Aço",
  "titanium": "Titânio"
} as const

export const Status = {
  available: "Disponível",
  rented: "Alugado"
} as const

export const ListingPicture = z.object({
  id: z.number(),
  path: z.string().transform((path) => env.STATIC_URL + path)
})
export type TListingPicture = z.infer<typeof ListingPicture>

export const RawRating = z.object({
  id: z.number(),
  value: z.number(),
  ownerUid: z.string()
})

export const Rating = z.object({
  total: z.number(),
  average: z.number(),
  distribution: z
    .object({
      5: z.number(),
      4: z.number(),
      3: z.number(),
      2: z.number(),
      1: z.number()
    })
    .partial()
})

export const Listing = z.object({
  id: z.number(),
  ownerUid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  hourPricing: z.number(),
  status: extractEnum(Status),
  pictures: z.array(ListingPicture),
  brand: z.string(),
  condition: extractEnum(Condition),
  type: extractEnum(BikeType),
  frameSize: extractEnum(FrameSize),
  wheelSize: extractEnum(WheelSize),
  material: extractEnum(Material),
  address: Address.optional(),
  rating: Rating.optional()
})
export type TListing = z.infer<typeof Listing>

export const Listings = z.array(Listing)
export type TListings = z.infer<typeof Listings>

export const ListingsResponse = z.object({
  listings: Listings,
  count: z.number()
})
export type TListingsResponse = z.infer<typeof ListingsResponse>
