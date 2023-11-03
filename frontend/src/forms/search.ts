import type { RegisterOptions } from "react-hook-form"

const RequiredFieldText = "Campo obrigatório"

export interface SearchForm {
  query: string
}

export const QueryValidation: RegisterOptions = {
  required: RequiredFieldText
}
