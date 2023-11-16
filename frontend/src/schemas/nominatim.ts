import { z } from "zod"

export const Location = z.object({
  lat: z.coerce.number(),
  lon: z.coerce.number(),
  boundingbox: z.array(z.coerce.number())
})
export type TLocation = z.infer<typeof Location>

export const Locations = z.array(Location)
export type TLocations = z.infer<typeof Locations>
