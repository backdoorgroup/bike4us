import { httpClient } from "@/services/clients"
import { ListingForm } from "@/schemas"

export const ListingsServices = {
  createListing: async (listing: ListingForm) => {
    return await httpClient.post("/listings", listing)
  },
  getListings: async () => {
    return await httpClient.get("/listings")
  }
}
