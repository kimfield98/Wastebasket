export default function Home() {
  return (
    <div className="main">
      <div className="main_left">
        <p className="main_icon0 circle w-96 h-96"></p>
      </div>
      <div className="main_right">
        <div className="main_right_top">
          <p className="text-6xl font-bold">안녕하세요</p>
          <p className="text-5xl font-bold">신입 프론트엔드 개발자</p>
          <p className="p-1">열린 마음으로 상대의 의견을 듣는 김초원입니다.</p>
        </div>
        <div className="main_right_bottom">
          <p className="main_icon1 circle text-xl font-bold w-32 h-32">Resume</p>
          <p className="main_icon2 circle text-xl font-bold w-32 h-32">Project</p>
          <p className="main_icon3 circle text-xl font-bold w-32 h-32">Contact</p>
        </div>
      </div>
    </div>
  )
}
