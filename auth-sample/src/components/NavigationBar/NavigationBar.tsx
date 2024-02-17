import useAuthButton from "../../hooks/auth/useAuthButton"
import Logo from "../Logo/Logo"

interface NavigationBarProps {
  scrollToSection: (sectionId: string) => void // 랜딩 페이지 특정 위치로 이동하는 함수
}

const NavigationBar: React.FC<NavigationBarProps> = ({ scrollToSection }) => {
  const { buttonText, handleButtonClick } = useAuthButton()

  return (
    <div className="fixed top-0 z-10 w-full bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div onClick={() => scrollToSection("home")} className="cursor-pointer">
            {/*<img src="/logo.png" alt="Logo" className="h-8 w-8" />*/}
            <Logo />
          </div>
          <div className="hidden space-x-4 md:flex">
            <a
              onClick={() => scrollToSection("section1")}
              className="flex cursor-pointer items-center text-gray-800 hover:text-gray-600"
            >
              Section 1
            </a>
            <a
              onClick={() => scrollToSection("section2")}
              className="flex cursor-pointer items-center text-gray-800 hover:text-gray-600"
            >
              Section 2
            </a>
            <a
              onClick={() => scrollToSection("section3")}
              className="flex cursor-pointer items-center text-gray-800 hover:text-gray-600"
            >
              Section 3
            </a>
            <a
              onClick={() => scrollToSection("login")}
              className="flex cursor-pointer items-center text-gray-800 hover:text-gray-600"
            >
              로그인
            </a>
            <a
              onClick={() => scrollToSection("signup")}
              className="flex cursor-pointer items-center text-gray-800 hover:text-gray-600"
            >
              회원가입
            </a>
            <button
              onClick={handleButtonClick}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
