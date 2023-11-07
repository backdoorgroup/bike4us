import { redirect } from "react-router-dom"

import { useAuthStore } from "@/stores"

export const redirectUnauthorizedLoader = () => {
  const { user } = useAuthStore.getState()

  if (!user?.uid) return redirect("/auth")

  return null
}

export const redirectAuthorizedLoader = () => {
  const { user } = useAuthStore.getState()

  if (user?.uid) return redirect("/")

  return null
}
