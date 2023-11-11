import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

export const ValidZipcodePattern = /(\d){5}(\d){3}/

export interface AddressForm {
  zipcode: string
}

export const ZipcodeValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: {
    length: (value) => value.length === 8 || "CEP deve ter 8 dígitos",
    valid: (value) => ValidZipcodePattern.test(value) || "CEP inválido"
  }
}
