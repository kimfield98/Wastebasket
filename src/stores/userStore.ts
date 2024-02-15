import { create } from 'zustand'
import { UserInfo } from './type/userStore.types'

const User = {
  id: "0",
  name: "",
  email: "",
}

export const useUserInfo  = create((set) => ({
  user: User,
  setUser: (user: UserInfo) => {set({ user })}
}))