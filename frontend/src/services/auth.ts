import * as firebase from "firebase/auth"

import { authClient, googleProvider } from "~/services/clients"

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  return await firebase.signInWithEmailAndPassword(authClient, email, password)
}

export const signInWithGooglePopup = async () => {
  return await firebase.signInWithPopup(authClient, googleProvider)
}

export const signOut = async () => {
  return await firebase.signOut(authClient)
}

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  return await firebase.createUserWithEmailAndPassword(authClient, email, password)
}
