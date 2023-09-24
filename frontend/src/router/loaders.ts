import { redirect } from "react-router-dom"

import { useUserStore } from "@/stores"

export const redirectUnauthorizedLoader = () => {
  const { user } = useUserStore.getState()

  if (!user?.uid) return redirect("/auth")

  return null
}

export const redirectAuthorizedLoader = () => {
  const { user } = useUserStore.getState()

  if (user?.uid) return redirect("/")

  return null
}
