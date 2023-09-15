import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut } from "firebase/auth"
import { RouterProvider } from "react-router-dom"

import { useUserStore } from "~/stores"
import { router } from "~/router"

const app = initializeApp({
  apiKey: import.meta.env._FB_API_KEY,
  authDomain: import.meta.env._FB_AUTH_DOMAIN,
  projectId: import.meta.env._FB_PROJECT_ID,
  storageBucket: import.meta.env._FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env._FB_MESSAGING_SENDER_ID,
  appId: import.meta.env._FB_APP_ID
})

const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)

export function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user, setUser } = useUserStore()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return unsubscribe
  }, [setUser])

  return (
    <>
      <RouterProvider router={router} />
      <pre>{JSON.stringify(user, null, 4)}</pre>

      <form
        onSubmit={async (e) => {
          e.preventDefault()

          await signInWithEmailAndPassword(auth, email, password)
        }}>
        <input onChange={(event) => setEmail(event.target.value)} />
        <input onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Sign in</button>
        <button type="button" onClick={async () => await signOut(auth)}>
          Sign out
        </button>
      </form>
    </>
  )
}
