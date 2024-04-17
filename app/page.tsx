import Link from "next/link";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between h-screen pt-56 pb-32'>
      <div className="flex flex-col items-center gap-1">
        <div className="text-7xl">🌳</div>
        <div className="text-3xl font-semibold">KIMFIELD WORLD</div>
        <div className="text-xl">환영합니다!</div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="w-full h-14 bg-lime-600 rounded-full text-white font-semibold">시작하기</button>
        <Link href='/login'>
          <span>이미 계정이 있으신가요?</span>
          <span className="font-semibold"> 로그인</span>
        </Link>
      </div>
    </main>
  );
}
