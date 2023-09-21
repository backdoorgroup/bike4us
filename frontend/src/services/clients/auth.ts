import { initializeApp } from "firebase/app"
import { getAuth, browserLocalPersistence, GoogleAuthProvider } from "firebase/auth"

import { settings } from "@config"
import { useUserStore } from "@/stores"

const { setUser } = useUserStore.getState()

const app = initializeApp({
  apiKey: settings.FB_API_KEY,
  authDomain: settings.FB_AUTH_DOMAIN,
  projectId: settings.FB_PROJECT_ID,
  storageBucket: settings.FB_STORAGE_BUCKET,
  messagingSenderId: settings.FB_MESSAGING_SENDER_ID,
  appId: settings.FB_APP_ID
})

export const authClient = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

authClient.useDeviceLanguage()
authClient.setPersistence(browserLocalPersistence)
authClient.onAuthStateChanged((user) => setUser(user))
