import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen pb-24 bg-[#E6ECF4]'>
      <div style={{ position: 'relative', width: '300px', height: '500px' }}>
        <Image
          alt='스플래시 이미지'
          src='/assets/밥버디.png'
          blurDataURL="/assets/밥버디.png"
          placeholder='blur'
          quality={100}
          fill
          sizes='100vw'
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <Link href='/login'>
        <button className='px-7 py-3 border border-[#758A94] rounded-full point-color font-bold cursor-pointer'>
          로그인 하기
        </button>
      </Link>
    </main>
  );
}
