export type User = {
  id: string
  name: string
  email: string
}

export type UserStore = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}
