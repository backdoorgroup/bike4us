import { brasilClient } from "~/services/clients"

import { CEP } from "~/schemas"

export const BrasilServices = {
  getCEP: async (cep?: string) => {
    const response = await brasilClient.get(`/cep/v2/${cep}`)

    const parsed = CEP.parse(response.data)

    return parsed
  }
}
