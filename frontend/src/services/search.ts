import { httpClient } from "~/services/clients"
import { ListingsResponse } from "~/schemas"

export const SearchServices = {
  searchListings: async (query: string) => {
    const response = await httpClient.get("/search/listings", { params: { query } })

    const parsed = ListingsResponse.parse(response.data)

    return parsed
  }
}
