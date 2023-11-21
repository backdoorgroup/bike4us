import { IMask } from "react-imask"

export const zipcodeMaskFactory = () =>
  IMask.createMask({
    mask: "00000-000"
  })

export const phoneMaskFactory = () =>
  IMask.createMask({
    mask: [
      {
        mask: "(00) 0000-0000"
      },
      {
        mask: "(00) 00000-0000"
      }
    ]
  })

export const formatZipcode = (zipcode?: string) => {
  if (!zipcode) return

  const zipcodeMask = zipcodeMaskFactory()

  zipcodeMask.resolve(zipcode)

  return zipcodeMask.value
}
