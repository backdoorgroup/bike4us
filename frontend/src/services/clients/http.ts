import axios from "axios"

import { useUserStore } from "@/stores"

export const httpClient = axios.create({
  baseURL: "http://localhost:8000/api/v1"
})

httpClient.interceptors.request.use(
  async function (config) {
    const { user } = useUserStore.getState()

    if (!user?.getIdToken) return config

    const token = await user?.getIdToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
