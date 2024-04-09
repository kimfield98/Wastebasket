import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center">
      <h1 className="text-2xl">
        존재하지 않는 페이지입니다.
      </h1>
      <Link href="/" className="border-b border-black">이동하기</Link>
    </div>
  );
}

export default NotFoundPage;