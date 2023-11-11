import { z } from "zod"

export const Location = z.object({
  type: z.string(),
  coordinates: z.object({
    longitude: z.coerce.number(),
    latitude: z.coerce.number()
  })
})
export type TLocation = z.infer<typeof Location>

export const CEP = z.object({
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  service: z.string(),
  location: Location
})
