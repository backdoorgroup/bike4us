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
  wheelSize: number
  material: string
  description: string
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
  //
}

export const BrandValidation: RegisterOptions = {
  //
}

export const FrameSizeValidation: RegisterOptions = {
  //
}

export const WheelSizeValidation: RegisterOptions = {
  //
}

export const MaterialValidation: RegisterOptions = {
  //
}

export const DescriptionValidation: RegisterOptions = {
  //
}
