import { signInWithEmailAndPassword, signOut } from "firebase/auth"

import { authClient } from "@/services/clients"
import { useUserStore } from "@/stores"

const { setUser } = useUserStore.getState()

authClient.onAuthStateChanged((user) => setUser(user))

export const AuthService = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    await signInWithEmailAndPassword(authClient, email, password)
  },
  signOut: async () => {
    await signOut(authClient)
  }
}
