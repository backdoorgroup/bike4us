import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"
const RequiredImageText = "É necessário colocar uma imagem"

export interface ListingForm {
  picture: FileList
  title: string
  hourPricing: number
  condition: string

  type: string
  brand: string
  frameSize: string
  wheelSize: string
  material: string
  description: string
}

export interface ListingOrderForm {
  from: Date // Data de retirada
  to: Date // Data de devolução
}

export const OrderFromValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: (value, values) => value < values.to || "Deve ser maior que a data de Devolução"
}

export const OrderToValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: (value, values) => value > values.from || "Deve ser menor que a data de Retirada"
}

// Required
export const PictureValidation: RegisterOptions = {
  required: RequiredImageText
}

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

export const DescriptionValidation: RegisterOptions = {}
