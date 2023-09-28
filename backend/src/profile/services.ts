import admin from "firebase-admin"

import { settings } from "@/settings"

const client = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: settings.FB_PROJECT_ID,
    clientEmail: settings.FB_CLIENT_EMAIL,
    privateKey: settings.FB_PRIVATE_KEY
  })
})

const auth = client.auth()

export const verifyIdToken = async (token: string) => await auth.verifyIdToken(token)

export const getUser = async (uid: string) => await auth.getUser(uid)
