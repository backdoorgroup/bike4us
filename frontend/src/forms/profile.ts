import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

// O regex ja está incluindo o formato do CEP com o hífen
export const ValidZipcodePattern = /(\d){5}-(\d){3}/
export const ZipcodeMask = "00000-000"

export interface AddressForm {
  zipcode: string
}

export const ZipcodeValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: {
    // Esse 9 é a soma do comprimento do CEP com o hífen da máscara.
    length: (value) => value.length === 9 || "CEP deve ter 8 dígitos",
    valid: (value) => ValidZipcodePattern.test(value) || "CEP inválido"
  }
}
