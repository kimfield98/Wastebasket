export type IssuedCoupon = {
  id: string
  name: string
  description: string
  discountType: "fixed" | "percent"
  discountAmount: number
  validFrom: Date
  validUntil: Date
}

export type DiscountStore = {
  totalDiscountAmount: number
  issuedCoupons: IssuedCoupon[]
  appliedCoupon?: IssuedCoupon
  availablePoints: number
  appliedPoints: number
  applyCoupon: (id: string) => void
  removeCoupon: () => void
  applyPoints: (points: number, totalPrice: number) => void
  removePoints: () => void
  calculateDiscount: (totalPrice: number) => void
  setIssuedCoupons: (coupons: IssuedCoupon[]) => void
  setAvailablePoints: (points: number) => void
}
