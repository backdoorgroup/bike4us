import axios from "axios"

export const brasilClient = axios.create({
  baseURL: "https://brasilapi.com.br/api/"
})
