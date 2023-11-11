import { z } from "zod"

export const CEP = z.object({
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  service: z.string(),
  location: z.object({
    type: z.string(),
    coordinates: z.object({
      longitude: z.string(),
      latitude: z.string()
    })
  })
})
