import { httpClient } from "@/services/clients"
import { ListingForm } from "@/schemas"

export const MarketplaceService = {
  createListing: async (listing: ListingForm) => {
    return await httpClient.post("/marketplace/listings", listing)
  }
}
