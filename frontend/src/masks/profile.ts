import { IMask } from "react-imask"
import { TAddress } from "~/schemas"

export const zipcodeMaskFactory = () =>
  IMask.createMask({
    mask: "00000-000"
  })

export const phoneMaskFactory = () =>
  IMask.createMask({
    mask: [
      {
        mask: "+55 (00) 0000-0000"
      },
      {
        mask: "+55 (00) 00000-0000"
      }
    ]
  })

export const formatPhoneNumber = (phoneNumber?: string | null) => {
  if (!phoneNumber) return

  const phoneMask = phoneMaskFactory()

  phoneMask.resolve(phoneNumber)

  return phoneMask.value
}

export const formatZipcode = (zipcode?: string) => {
  if (!zipcode) return

  const zipcodeMask = zipcodeMaskFactory()

  zipcodeMask.resolve(zipcode)

  return zipcodeMask.value
}

export const formatAddress = (address?: TAddress | null, complete: boolean = false) => {
  if (!address) return

  const streetAndNumber = `${address.street}, ${address.number}`
  const cityAndState = `${address.neighborhood}, ${address.city} - ${address.state}`
  const zipcode = formatZipcode(address.zipcode)

  return complete ? `${streetAndNumber} - ${cityAndState}, ${zipcode}` : cityAndState
}
