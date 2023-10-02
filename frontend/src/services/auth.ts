import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

import { authClient, googleProvider } from "@/services/clients"

export const AuthService = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(authClient, email, password)
  },
  signInWithGooglePopup: async () => {
    return await signInWithPopup(authClient, googleProvider)
  },
  signOut: async () => {
    return await signOut(authClient)
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(authClient, email, password)
  }
}
