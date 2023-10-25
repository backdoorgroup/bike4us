export const settings = {
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
  }
} as const
