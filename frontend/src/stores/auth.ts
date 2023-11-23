import type { User } from "firebase/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  user: User | null
  verificationId: string | null
}
interface Actions {
  setUser: (user: User | null) => void
  setVerificationId: (verificationId: string | null) => void
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      verificationId: null,
      setUser: (user) => set(() => ({ user }), true),
      setVerificationId: (verificationId) => set(() => ({ verificationId }), true)
    }),
    { name: "authStore" }
  )
)
