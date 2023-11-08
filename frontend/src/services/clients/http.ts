import axios from "axios"

import { authClient } from "@/services/clients"
import { useAuthStore } from "@/stores"
import { env } from "@/env"

export const httpClient = axios.create({
  baseURL: env.API_URL
})

httpClient.interceptors.request.use(
  async function (config) {
    await authClient.authStateReady()

    const { user } = useAuthStore.getState()

    if (!user?.getIdToken) return config

    const token = await user?.getIdToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
