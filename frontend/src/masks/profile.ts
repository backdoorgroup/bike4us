import { IMask } from "react-imask"

export const zipcodeMaskFactory = () =>
  IMask.createMask({
    mask: "00000-000"
  })

export const formatZipcode = (zipcode: string) => {
  const zipcodeMask = zipcodeMaskFactory()

  zipcodeMask.resolve(zipcode)

  return zipcodeMask.value
}
