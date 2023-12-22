"use client"

import Link from "next/link";
import { useRecoilState } from 'recoil';
import { activeTabState } from './recoil/Atom'

export default function Home() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  return (
    <div className="main">
      <div className="main_left">
        <p className="main_image circle w-96 h-96"></p>
      </div>
      <div className="main_right">
        <div>
          <p className="text-6xl font-bold">안녕하세요</p>
          <p className="text-5xl font-bold">신입 프론트엔드 개발자</p>
          <p className="text-xl p-2">열린 마음으로 상대의 의견을 듣는 김초원입니다.</p>
        </div>
        <div className="flex gap-3 mt-3">
          <Link href="/resume" className="orange circle w-32 h-32 text-xl font-bold">Resume</Link>
          <Link href="/projects" className="red circle w-32 h-32 text-xl font-bold">Project</Link>
          <Link href="/contact" className="blue circle w-32 h-32 text-xl font-bold">Contact</Link>
        </div>
      </div>
    </div>
  )
}
