import { z } from "zod"

import { env } from "~/env"
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

export const ListingPicture = z.object({
  id: z.number(),
  path: z.string().transform((path) => env.STATIC_URL + path)
})
export type TListingPicture = z.infer<typeof ListingPicture>

export const Listing = z.object({
  id: z.number(),
  ownerUid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  hourPricing: z.number(),
  status: z.string(),
  pictures: z.array(ListingPicture),
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
export type TListingsResponse = z.infer<typeof ListingsResponse>

const UserMetadata = z.object({
  creationTime: z.string(),
  lastSignInTime: z.string(),
  lastRefreshTime: z.string().nullable().optional()
})

const UserInfo = z.object({
  uid: z.string(),
  displayName: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  photoURL: z.string().nullable().optional(),
  providerId: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional()
})

export const User = UserInfo.extend({
  disabled: z.boolean(),
  emailVerified: z.boolean(),
  metadata: UserMetadata,
  providerData: z.array(UserInfo),
  tokensValidAfterTime: z.string()
}).nullable()
export type TUser = z.infer<typeof User>

export const Address = z
  .object({
    id: z.number(),
    city: z.string(),
    neighborhood: z.string(),
    number: z.string(),
    ownerUid: z.string(),
    state: z.string(),
    street: z.string(),
    zipcode: z.string(),
    complement: z.string()
  })
  .nullable()
export type TAddress = z.infer<typeof Address>

export const Profile = z.object({
  user: User,
  address: Address
})
export type TProfile = z.infer<typeof Profile>
