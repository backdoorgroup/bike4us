import admin from "firebase-admin"

import { settings } from "@/settings"

const client = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: settings.FB_PROJECT_ID,
    clientEmail: settings.FB_CLIENT_EMAIL,
    privateKey: settings.FB_PRIVATE_KEY
  })
})

export const auth = client.auth()
