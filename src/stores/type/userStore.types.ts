export type User = {
  id: string
  name: string
  email: string
}

export type UserInfo = {
  user: User | null
  setUser: (user: User) => void
}
