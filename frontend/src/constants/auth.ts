import type { RegisterOptions } from "react-hook-form"

export const RequiredFieldText = "Campo obrigatório"

export const EmailValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const PasswordValidation: RegisterOptions = {
  required: RequiredFieldText
}
