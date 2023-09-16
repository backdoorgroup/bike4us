import { useState } from "react"

import { useUserStore } from "~/stores"
import { AuthService } from "~/services"

export function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user } = useUserStore()

  return (
    <>
      <pre>{JSON.stringify(user, null, 4)}</pre>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          await AuthService.signIn.emailAndPassword(email, password)
        }}>
        <input onChange={(event) => setEmail(event.target.value)} />
        <input onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Sign in</button>
        <button type="button" onClick={async () => await AuthService.signOut()}>
          Sign out
        </button>
      </form>
    </>
  )
}
