import { create } from "zustand"

import type { User } from "firebase/auth"

interface State {
  user: User | null
}
interface Actions {
  setUser: (user: User) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user }))
}))
