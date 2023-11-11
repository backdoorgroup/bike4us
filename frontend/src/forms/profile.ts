import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

export const ValidZipcodePattern = /(\d){5}(\d){3}/

export interface AddressForm {
  city: string
  complement?: string
  neighborhood: string
  number: string
  state: string
  street: string
  zipcode: string
}

export const ZipcodeValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: {
    length: (value) => value.length === 8 || "CEP deve ter 8 dígitos",
    valid: (value) => ValidZipcodePattern.test(value) || "CEP inválido"
  }
}

export const StreetValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const NumberValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const ComplementValidation: RegisterOptions = {}

export const CityValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const StateValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const NeighborhoodValidation: RegisterOptions = {
  required: RequiredFieldText
}
