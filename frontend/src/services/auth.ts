import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

import { authClient, googleProvider } from "@/services/clients"
import { useUserStore } from "@/stores"

const { setUser } = useUserStore.getState()

authClient.onAuthStateChanged((user) => setUser(user))

export const AuthService = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    await signInWithEmailAndPassword(authClient, email, password)
  },
  signInWithGooglePopup: async () => {
    await signInWithPopup(authClient, googleProvider)
  },
  signOut: async () => {
    await signOut(authClient)
  }
}
