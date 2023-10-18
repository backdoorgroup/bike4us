import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

export interface ListingForm {
  title: string
  type: string
  quadro: string
  aro: number
  time: string
  condition: string
  brand: string
  color: string
  description: string
  hourPricing: number

}

export const TitleValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const TypeValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const QuadroValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const AroValidation: RegisterOptions = {
  required: RequiredFieldText,
  valueAsNumber: true
}

export const TimeValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const ConditionValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const BrandValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const ColorValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const DescriptionValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const HourPricingValidation: RegisterOptions = {
  required: RequiredFieldText,
  valueAsNumber: true
}
