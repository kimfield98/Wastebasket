import React, { useEffect } from "react"
import useRequireAuth from "../../hooks/auth/useRequiredAuth"
import { useFetchDiscountInfo } from "../../hooks/payment/useFetchDiscountInfo"
import { useCartStore } from "../../stores/cart-store/cartStore"
import { useDiscountStore } from "../../stores/discount-store/discountStore"
import { formatNumber } from "../../utils/formatNumber"

const Checkout: React.FC = () => {
  useRequireAuth()
  useFetchDiscountInfo()

  const { cartItems, totalAmount, removeItem } = useCartStore()
  const {
    totalDiscountAmount,
    calculateDiscount,
    applyCoupon,
    removeCoupon,
    issuedCoupons,
    applyPoints,
    availablePoints,
    appliedCoupon,
  } = useDiscountStore()

  useEffect(() => {
    calculateDiscount(totalAmount)
  }, [calculateDiscount, totalAmount])

  return (
    <div className="container mx-auto mt-5">
      <h1 className="mb-5 text-4xl font-semibold">Checkout</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          {cartItems.map((item, index) => (
            <div key={index} className="mb-4 flex items-center justify-between">
              <span>{item.name}</span>
              <span>{formatNumber(item.price)} 원</span>
              <button onClick={() => removeItem(item.id)} className="text-red-600">
                제거
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <span>총계:</span>
            <span>{formatNumber(totalAmount)} 원</span>
          </div>
          <div className="mb-4">
            <span>할인:</span>
            <span>{formatNumber(totalDiscountAmount)} 원</span>
          </div>
          <div className="mb-4">
            <span>결제 금액:</span>
            <span>{formatNumber(totalAmount - totalDiscountAmount)} 원</span>
          </div>
          <div className="mb-4">
            <select
              value={appliedCoupon?.id || ""}
              onChange={(e) => applyCoupon(e.target.value)}
              className="rounded border p-2"
            >
              <option>-- 쿠폰을 선택하세요 --</option>
              {issuedCoupons.map((coupon) => (
                <option key={coupon.id} value={coupon.id}>
                  {coupon.name}
                </option>
              ))}
            </select>
            <button onClick={removeCoupon} className="ml-2 text-red-600">
              적용 해제
            </button>
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="포인트를 입력하세요"
              className="rounded border p-2"
              onChange={(e) => {
                const appliedPoint = Math.min(availablePoints, parseInt(e.target.value, 10), totalAmount)
                e.target.value = appliedPoint.toString()
                applyPoints(appliedPoint, totalAmount)
              }}
              min="0"
              max={availablePoints}
            />
            <div>보유 포인트: {formatNumber(availablePoints)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
