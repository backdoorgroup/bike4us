import * as firebase from "firebase/auth"

import { authClient, googleProvider, phoneProvider, recaptchaVerifier } from "~/services/clients"

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

export const verifyPhoneNumber = async (phoneNumber: string) => {
  return await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier)
}

export const updatePhoneNumber = async (user: firebase.User, verificationId: string, verificationCode: string) => {
  const credential = firebase.PhoneAuthProvider.credential(verificationId, verificationCode)

  return await firebase.updatePhoneNumber(user, credential)
}
