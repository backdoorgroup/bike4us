import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

export interface ListingForm {
  title: string
  hourPricing: number
  condition: string

  type: string
  brand: string
  frameSize: string
  wheelSize: number
  material: string
  description: string
}

// Required
export const TitleValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const HourPricingValidation: RegisterOptions = {
  required: RequiredFieldText,
  valueAsNumber: true
}

export const ConditionValidation: RegisterOptions = {
  required: RequiredFieldText
}

// More details
export const TypeValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const BrandValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const FrameSizeValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const WheelSizeValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const MaterialValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const DescriptionValidation: RegisterOptions = {
  required: RequiredFieldText
}
