import admin from "firebase-admin"

import { settings } from "~/settings"

const config = {
  projectId: settings.FB_PROJECT_ID,
  clientEmail: settings.FB_CLIENT_EMAIL,
  privateKey: settings.FB_PRIVATE_KEY
}

const firebase = admin.initializeApp({
  credential: admin.credential.cert(config)
})

export const auth = firebase.auth()
