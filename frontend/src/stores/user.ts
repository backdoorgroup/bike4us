import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { User } from "firebase/auth"

interface State {
  user: User | null
}
interface Actions {
  setUser: (user: User | null) => void
}

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user }), true)
    }),
    { name: "userStore" }
  )
)
