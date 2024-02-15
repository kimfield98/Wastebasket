import { create } from 'zustand'
import { User, UserInfo } from './type/userStore.types'

const initialUserState: User = {
  id: "",
  name: "",
  email: "",
}

export const useUserInfo  = create<{ user: User; setUser: (user: User) => void }>((set) => ({
  user: initialUserState,
  setUser: (user: User) => {set({ user })}
}))