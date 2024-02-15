import Link from 'next/link'
import { Button } from "./ui/button";

export default function NavigationBar() {
  return (
    <div className="flex justify-end items-center w-[100%] h-14 py-3 px-4 bg-white">
      <Link href="/login">
        <Button className="h-8 w-[67px] text-sm bg-[#393F7B]">로그인</Button>
      </Link>
    </div>
  );
}