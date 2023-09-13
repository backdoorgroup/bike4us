import axios from "axios"

import { useUserStore } from "~/stores"

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1"
})

client.interceptors.request.use(
  (config) => {
    const { user } = useUserStore()

    const token = user?.getIdToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => Promise.reject(error)
)
