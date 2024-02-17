import axios from "axios"
import { useEffect } from "react"
import { useDiscountStore } from "../../stores/discount-store/discountStore"
import { CouponsResponse, PointsResponse } from "../../types/apiResponse"

export const useFetchDiscountInfo = () => {
  const { setIssuedCoupons, setAvailablePoints } = useDiscountStore()

  useEffect(() => {
    let isUnmounted = false
    // const cancelTokenSource: CancelTokenSource = axiosInstance.CancelToken.source()

    const fetchDiscountInfo = async () => {
      try {
        const [pointsResponse, couponsResponse] = await mockResolve()
        // TODO: API 개발 완료 후 await axiosInstance로 대체
        // const [pointsResponse, couponsResponse] = await Promise.all([
        //   axios.get<{ data: PointsResponse }>('/api/points', { cancelToken: cancelTokenSource.token }),
        //   axios.get<{ data: CouponsResponse }>('/api/coupons', { cancelToken: cancelTokenSource.token })
        // ]);

        if (isUnmounted) return

        setAvailablePoints(pointsResponse.data.availablePoints)
        setIssuedCoupons(couponsResponse.data.issuedCoupons)
      } catch (error) {
        if (axios.isCancel(error)) return
        if (isUnmounted) return

        console.error("Failed to fetch discount info:", error)
      }
    }

    fetchDiscountInfo()

    return () => {
      isUnmounted = true
      // cancelTokenSource.cancel()
    }
  }, [])
}

const mockResolve = async () => {
  return await Promise.all([
    new Promise<{ data: PointsResponse }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            availablePoints: 37481926,
          },
        })
      }, 500) // 1초 지연
    }),
    new Promise<{ data: CouponsResponse }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            issuedCoupons: [
              {
                id: "1",
                name: "신규가입 쿠폰",
                description: "신규가입을 축하드립니다. 10,000원 쿠폰을 발급해드렸으니, 다음 주문 시 사용해주세요.",
                discountType: "fixed",
                discountAmount: 10000,
                validFrom: new Date("2023-01-01"),
                validUntil: new Date("2025-12-31"),
              },
              {
                id: "2",
                name: "재방문 쿠폰",
                description: "다시 찾아주셔서 감사합니다. 20,000원 쿠폰을 발급해드렸으니, 다음 주문 시 사용해주세요.",
                discountType: "percent",
                discountAmount: 90,
                validFrom: new Date("2023-01-01"),
                validUntil: new Date("2029-12-31"),
              },
            ],
          },
        })
      }, 500) // 1초 지연
    }),
  ])
}

const mockReject = async () => {
  await new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Network failed"))
    }, 1000) // 1초 지연
  })
}
