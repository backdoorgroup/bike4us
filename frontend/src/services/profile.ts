import { httpClient } from "~/services/clients"
import { Address } from "~/schemas"

export const ProfileServices = {
  getAddress: async () => {
    const response = await httpClient.get("/profile/address")

    const parsed = Address.parse(response.data)

    return parsed
  }
}
