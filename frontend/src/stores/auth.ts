import type { User } from "firebase/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  user: User | null
}
interface Actions {
  setUser: (user: User | null) => void
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user }), true)
    }),
    { name: "authStore" }
  )
)
