import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"
const RequiredImageText = "É necessário colocar uma imagem"

export interface ListingForm {
  hourPricing: number
  description: string
  title: string
  picture: FileList
}

export const TitleValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const DescriptionValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const HourPricingValidation: RegisterOptions = {
  required: RequiredFieldText,
  valueAsNumber: true
}

export const PictureValidation: RegisterOptions = {
  required: RequiredImageText
}
