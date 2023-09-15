import axios from "axios"

import { useUserStore } from "~/stores"

export const client = axios.create({
  baseURL: "http://localhost:8000/api/v1"
})

client.interceptors.request.use(
  async function (config) {
    const { user } = useUserStore.getState()
    const token = await user?.getIdToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
