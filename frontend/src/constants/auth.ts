import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

export const NameValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const EmailValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const PasswordValidation: RegisterOptions = {
  required: RequiredFieldText
}
