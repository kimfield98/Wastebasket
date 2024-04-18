import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen pb-24 bg-[#E6ECF4]'>
      <div style={{ position: 'relative', width: '300px', height: '500px' }}>
        <Image
          alt='스플래시 이미지'
          src='/밥버디.png'
          blurDataURL='/assets/밥버디.png'
          placeholder='blur'
          quality={100}
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className='flex flex-col gap-10 items-center text-[#5f7a85]'>
        <Link href='/create-account'>
          <button className='px-7 py-3 border border-[#758A94] rounded-full point-color font-bold cursor-pointer'>
            시작하기
          </button>
        </Link>
        <Link href='/login'>
          <span>이미 계정이 있으신가요?&nbsp;</span>
          <span className='font-semibold underline underline-offset-4'>
            로그인하기
          </span>
        </Link>
      </div>
    </main>
  );
}

export default Home;
