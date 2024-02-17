import { useRouter } from "next/router"
import { useEffect } from "react"
import { useUserStore } from "../../stores/user-store/userStore"

const useRequireAuth = () => {
  const { user } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      const currentPath = router.asPath
      router.push(`/login?next=${encodeURIComponent(currentPath)}`)
    }
  }, [user, router])
}

export default useRequireAuth
