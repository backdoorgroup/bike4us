import { nominatimClient } from "~/services/clients"

import { Locations } from "~/schemas"

export const compoundSearch = async (params: Record<string, unknown>) => {
  const response = await nominatimClient.get("/search", { params: { ...params, country: "Brasil", format: "jsonv2" } })

  const parsed = Locations.parse(response.data)

  return parsed
}
