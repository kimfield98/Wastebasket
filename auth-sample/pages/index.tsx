import Head from "next/head"
import { useEffect } from "react"
import Login from "../src/components/Login/Login"
import NavigationBar from "../src/components/NavigationBar/NavigationBar"
import Signup from "../src/components/Signup/Signup"

export default function Web() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    const navBarHeight = document.querySelector(".fixed.top-0")?.clientHeight || 0

    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.scrollY - navBarHeight
      window.scrollTo({ top: topPosition, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            // TODO: 해당 섹션 ID로 메뉴 강조 로직 구현
          }
        })
      },
      { threshold: 0.5 } // 50% 이상 보일 때 적용
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect() // 컴포넌트가 언마운트될 때 observer 해제
  }, [])

  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>프론트엔드 베이스코드 | 스파르타</title>
      </Head>
      <NavigationBar scrollToSection={scrollToSection} />
      <section id="section1" className="h-screen bg-gray-100 pt-16">
        section1
      </section>
      <section id="section2" className="h-screen bg-gray-200">
        section2
      </section>
      <section id="section3" className="h-screen bg-gray-300">
        section3
      </section>
      <Login />
      <Signup />
    </>
  )
}
