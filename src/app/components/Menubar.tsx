"use client"

import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { activeMenuState } from "../recoil/Atom";

export default function Menubar () {
  const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);

  // Menubar가 활성화 되었을 때 스크롤 기능 숨기기
  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeMenu]);

  return (
    <div className="menubar">
      <div className="absolute top-10 right-10 cursor-pointer text-2xl hover:font-bold" onClick={()=>setActiveMenu(false)}>X</div>
      <Link href="/resume" className="text-2xl hover:font-bold">Resume</Link>
      <p className="line"></p>
      <Link href="/projects" className="text-2xl hover:font-bold">Project</Link>
      <p className="line"></p>
      <Link href="/contact" className="text-2xl hover:font-bold">Contact</Link>
    </div>
  );
}