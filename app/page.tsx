import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen pb-24'>
      <Image
        src="/assets/밥버디.png"
        width={300}
        height={500}
        alt="스플래시 이미지"
      />
      <Link href="/login">
        <button className='px-7 py-3 border border-[#758A94] rounded-full point-color font-bold cursor-pointer'>로그인 하기</button>
      </Link>
    </main>
  );
}
