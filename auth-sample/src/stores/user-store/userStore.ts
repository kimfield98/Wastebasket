import Cookies from "js-cookie"
import { create } from "zustand"
import type { StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import type { User, UserStore } from "./types/userStore.types"
import { env } from "../../../env.mjs"
import { getLocalStorageValue, setLocalStorageValue } from "../../utils/storage"

const store: StateCreator<UserStore> = (set) => ({
  user: getLocalStorageValue<User | null>("user", null),
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  setAccessToken: (token) => {
    Cookies.set("accessToken", token, { expires: env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS })
    set({ accessToken: token })
  },
  setRefreshToken: (token) => {
    Cookies.set("refreshToken", token, { expires: env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS })
    set({ refreshToken: token })
  },
  setUser: (user) => {
    setLocalStorageValue("user", user)
    set({ user })
  },
  logout: () => {
    localStorage.removeItem("user")
    Cookies.set("accessToken", "", { expires: 0 })
    Cookies.set("refreshToken", "", { expires: 0 })
    set({ user: null, accessToken: null })
  },
})

export const useUserStore =
  process.env.NODE_ENV !== "production" ? create<UserStore>()(devtools(store)) : create<UserStore>()(store)
