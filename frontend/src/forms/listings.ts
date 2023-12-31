import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"
const RequiredImageText = "É necessário colocar uma imagem"
const RequiredRatingText = "É necessário colocar uma nota"

export interface ListingForm {
  pictures: File[]
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

export interface RateListingForm {
  value: number
}

// Required
export const RatingValidation: RegisterOptions = {
  required: RequiredRatingText
}

export const PicturesValidation: RegisterOptions = {
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
