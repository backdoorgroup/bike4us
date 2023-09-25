import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

const ValidEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Precisa ser um email válido
const MinimumLengthPattern = /^.{8,}$/ // Precisa ter no mínimo 8 caracteres
const MaximumLengthPattern = /^.{0,64}$/ // Pode ter no máximo 64 caracteres
const EntirelyNumericPattern = /^\d+$/ // Não pode ser totalmente numérico

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
}

export const NameValidation: RegisterOptions = {
  required: RequiredFieldText
}

export const EmailValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: {
    validEmail: (email) => ValidEmailPattern.test(email) || "O email precisa ser válido"
  }
}

export const PasswordValidation: RegisterOptions = {
  required: RequiredFieldText,
  validate: {
    minimumLength: (password) => MinimumLengthPattern.test(password) || "A senha precisa ter no mínimo 8 caracteres",
    maximumLength: (password) => MaximumLengthPattern.test(password) || "A senha pode ter no máximo 64 caracteres",
    notEntirelyNumeric: (password) =>
      !EntirelyNumericPattern.test(password) || "A senha não pode ser totalmente numérica"
  }
}
