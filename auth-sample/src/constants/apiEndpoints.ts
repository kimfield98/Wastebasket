import { env } from "../../env.mjs"

export const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL

// AUTH
export const AUTH_LOGIN = "/auth/login"
export const AUTH_SIGNUP = "/auth/signup"
export const AUTH_REFRESH = "/auth/refresh"
