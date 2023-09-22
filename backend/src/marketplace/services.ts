import { Listing } from "@/marketplace/models"

export const getListings = async () => await Listing.find()
