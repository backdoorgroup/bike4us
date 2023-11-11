import { httpClient } from "~/services/clients"

import type { AddressForm } from "~/forms"
import { Address, Profile } from "~/schemas"

export const ProfileServices = {
  getProfile: async () => {
    const response = await httpClient.get("/profile")

    const parsed = Profile.parse(response.data)

    return parsed
  },

  createAddress: async (address: AddressForm) => {
    const response = await httpClient.post("/profile/address", address)

    const parsed = Address.parse(response.data)

    return parsed
  }
}
