import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

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
