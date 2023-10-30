import { httpClient } from "@/services/clients"
import { ListingsResponse, Listing } from "@/services/schemas"

import { transform } from "@/utils"
import type { ListingForm } from "@/forms"

export const ListingsServices = {
  createListing: async (listing: ListingForm) => {
    const form = transform({
      ...listing,
      picture: listing.picture.item(0)
    })

    const response = await httpClient.post("/listings", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

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
