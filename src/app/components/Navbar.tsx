"use client"

import Link from "next/link";
import { useRecoilState } from 'recoil';
import { activeMenuState, activeTabState } from '../recoil/Atom'
import Menubar from "./Menubar";

export default function Navbar () {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);

  return (
    <div className="navbar">
      <Link href="/" className="navbar_left" onClick={() => setActiveTab('')}>
        <p className="circle w-6 h-6 green"></p>
        <p className="text-xl font-bold">kimfield</p>
        <p>Frontend</p>
      </Link>
      <div className="navbar_right">
        <Link href='/resume' className={`hidden md:flex ${activeTab === 'resume' ? "active" : ""}`} onClick={() => setActiveTab('resume')}>Resume</Link>
        <p className="line hidden md:flex"></p>
        <Link href='/projects' className={`hidden md:flex ${activeTab === 'projects' ? "active" : ""}`} onClick={() => setActiveTab('projects')}>Project</Link>
        <p className="line hidden md:flex"></p>
        <Link href='/contact' className={`hidden md:flex ${activeTab === 'contact' ? "active" : ""}`} onClick={() => setActiveTab('contact')}>Contact</Link>
        <div className="cursor-pointer" onClick={()=>setActiveMenu(!activeMenu)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list md:hidden" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </div>
        {activeMenu && <Menubar />}
      </div>
    </div>
  );
}