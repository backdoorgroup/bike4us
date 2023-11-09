import { httpClient } from "~/services/clients"
import { ListingsResponse, Listing } from "~/schemas"

import type { ListingForm } from "~/forms"

export const ListingsServices = {
  createListing: async (listing: ListingForm) => {
    const response = await httpClient.postForm("/listings", listing)

    const parsed = Listing.parse(response.data)

    return parsed
  },

  getListing: async (id: number | string) => {
    const response = await httpClient.get(`/listings/${id}`)

    const parsed = Listing.parse(response.data)

    return parsed
  },

  getListings: async () => {
    const response = await httpClient.get("/listings")

    const parsed = ListingsResponse.parse(response.data)

    return parsed
  }
}
