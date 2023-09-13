import axios from "axios"

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1"
})

client.interceptors.request.use(
  (config) => {
    const accessToken = ""

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => Promise.reject(error)
)
