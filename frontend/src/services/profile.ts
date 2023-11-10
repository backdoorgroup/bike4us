import { httpClient } from "~/services/clients"
import { Address, Profile } from "~/schemas"

export const ProfileServices = {
  getProfile: async () => {
    const response = await httpClient.get("/profile")

    const parsed = Profile.parse(response.data)

    return parsed
  },
  getAddress: async () => {
    const response = await httpClient.get("/profile/address")

    const parsed = Address.parse(response.data)

    return parsed
  }
}
