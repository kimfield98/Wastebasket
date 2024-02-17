import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserStore } from "../../stores/user-store/userStore"

const useAuthButton = () => {
  const router = useRouter()
  const [buttonText, setButtonText] = useState<string>("로그인")
  const { user, logout } = useUserStore()

  useEffect(() => {
    setButtonText(user ? "로그아웃" : "로그인")
  }, [user])

  const handleButtonClick = () => {
    if (user) {
      logout()
    } else {
      router.push("/login")
    }
  }

  return {
    buttonText,
    handleButtonClick,
  }
}

export default useAuthButton
