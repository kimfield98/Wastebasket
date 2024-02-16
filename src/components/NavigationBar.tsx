"use client"
import Link from 'next/link'
import { Button } from "./ui/button";
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';

export default function NavigationBar() {
  const [isButtonText, setButtonText] = useState("로그인")

  useEffect(() => {
    if(useUserStore.getState().accessToken !== null) {
      setButtonText("로그아웃")
    }
  },[])
  
  return (
    <div className="flex justify-end items-center w-full h-14 py-3 px-4 bg-white">
      <Link href={isButtonText === "로그인" ? "/login" : "/logout"}>
        <Button className="h-8 w-[67px] text-sm bg-[#393F7B]">
          {isButtonText}
        </Button>
      </Link>
    </div>
  );
}