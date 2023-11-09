import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, browserLocalPersistence, getAuth } from "firebase/auth"

import { useAuthStore } from "~/stores"
import { env } from "~/env"

const { setUser } = useAuthStore.getState()

const app = initializeApp({
  apiKey: env.FB_API_KEY,
  authDomain: env.FB_AUTH_DOMAIN,
  projectId: env.FB_PROJECT_ID,
  storageBucket: env.FB_STORAGE_BUCKET,
  messagingSenderId: env.FB_MESSAGING_SENDER_ID,
  appId: env.FB_APP_ID
})

export const authClient = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

authClient.useDeviceLanguage()
authClient.setPersistence(browserLocalPersistence)
authClient.onAuthStateChanged((user) => setUser(user))
