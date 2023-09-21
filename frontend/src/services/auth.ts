import { signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth"

import { authClient, googleProvider } from "@/services/clients"

export const AuthService = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    await signInWithEmailAndPassword(authClient, email, password)
  },
  signInWithGooglePopup: async () => {
    await signInWithPopup(authClient, googleProvider)
  },
  signOut: async () => {
    await signOut(authClient)
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    await createUserWithEmailAndPassword(authClient, email, password)
  }
}
