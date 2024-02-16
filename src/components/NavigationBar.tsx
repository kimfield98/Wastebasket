"use client"
import Link from 'next/link'
import { Button } from "./ui/button";
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NavigationBar() {
  const [isButton, setButton] = useState(true)

  useEffect(() => {
    if(useUserStore.getState().accessToken !== null) {
      setButton(false)
    }
  },[])
  
  return (
    <div className="flex justify-end items-center w-full h-14 py-3 px-4 bg-white">
      {isButton && 
      <Button className="h-8 w-[67px] text-sm bg-[#393F7B]">
        로그인
      </Button>
      }
      {!isButton &&
      <Link href="/mypage">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      }
    </div>
  );
}