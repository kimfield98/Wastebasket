import { IssuedCoupon } from "../stores/discount-store/types/discountStore.types"

export type AuthResponse = {
  user: {
    id: string
    name: string
    email: string
  }
  accessToken: string
  refreshToken: string
}

export type TokenRefreshResponse = {
  accessToken: string
}

export type ServerErrorResponse = {
  message: string
}

export type PointsResponse = {
  availablePoints: number
}

export type CouponsResponse = {
  issuedCoupons: IssuedCoupon[]
}
