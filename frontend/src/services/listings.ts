import { httpClient } from "@/services/clients"
import { ListingResponse, Listing } from "@/services/schemas"

import { transform } from "@/utils"
import { ListingForm } from "@/forms"

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
  getListings: async () => {
    const response = await httpClient.get("/listings")

    const parsed = ListingResponse.parse(response.data)

    return parsed
  }
}
