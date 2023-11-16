export const env = {
  get FB_API_KEY() {
    return import.meta.env._FB_API_KEY
  },
  get FB_AUTH_DOMAIN() {
    return import.meta.env._FB_AUTH_DOMAIN
  },
  get FB_PROJECT_ID() {
    return import.meta.env._FB_PROJECT_ID
  },
  get FB_STORAGE_BUCKET() {
    return import.meta.env._FB_STORAGE_BUCKET
  },
  get FB_MESSAGING_SENDER_ID() {
    return import.meta.env._FB_MESSAGING_SENDER_ID
  },
  get FB_APP_ID() {
    return import.meta.env._FB_APP_ID
  },

  get FRONTEND_URL() {
    return new URL(import.meta.url).origin
  },
  get BACKEND_URL() {
    return import.meta.env._BACKEND_URL || "http://localhost:8000/"
  },

  get API_URL() {
    return this.BACKEND_URL + "api/v1/"
  },
  get STATIC_URL() {
    return this.BACKEND_URL + "static/"
  },

  get MAP_STYLE_TOKEN() {
    return import.meta.env._MAP_STYLE_TOKEN
  },
  get MAP_STYLE_URL() {
    return import.meta.env._MAP_STYLE_URL
  },
  get MAP_STYLE() {
    return `${this.MAP_STYLE_URL}?key=${this.MAP_STYLE_TOKEN}`
  }
} as const
