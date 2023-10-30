import { z } from "zod"

import { settings } from "@config"
import { extractEnum } from "@/utils"

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

export const Listing = z.object({
  id: z.number(),
  ownerUid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  hourPricing: z.number(),
  status: z.string(),
  picturePath: z.string().transform((picturePath) => settings.STATIC_URL + picturePath),
  brand: z.string(),
  condition: extractEnum(Condition),
  type: extractEnum(BikeType),
  frameSize: extractEnum(FrameSize),
  wheelSize: extractEnum(WheelSize),
  material: extractEnum(Material)
})
export type TListing = z.infer<typeof Listing>

export const Listings = z.array(Listing)
export type TListings = z.infer<typeof Listings>

export const ListingsResponse = z.object({
  listings: Listings,
  count: z.number()
})

export const Order = z.object({
  id: z.number(),
  listing: Listing,
  to: z.coerce.date(),
  from: z.coerce.date(),
  ordererUid: z.string()
})
export type TOrder = z.infer<typeof Order>

export const Orders = z.array(Order)
export type TOrders = z.infer<typeof Orders>

export const OrdersResponse = z.object({
  orders: Orders,
  count: z.number()
})
