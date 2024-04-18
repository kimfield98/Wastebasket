"use client"

import Link from "next/link";

function ErrorPage() {
  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center">
      <h1 className="text-2xl">
        예기치 못한 오류가 발생했습니다.
      </h1>
      <div className="py-4">
        <Link href='/' className="border-b border-black">이동하기</Link>
      </div>
    </div>
  );
}

export default ErrorPage;