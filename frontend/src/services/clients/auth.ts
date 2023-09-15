import { initializeApp } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"

const app = initializeApp({
  apiKey: import.meta.env._FB_API_KEY,
  authDomain: import.meta.env._FB_AUTH_DOMAIN,
  projectId: import.meta.env._FB_PROJECT_ID,
  storageBucket: import.meta.env._FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env._FB_MESSAGING_SENDER_ID,
  appId: import.meta.env._FB_APP_ID
})

export const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)
