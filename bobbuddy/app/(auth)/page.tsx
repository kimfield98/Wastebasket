import Image from 'next/image';
import Link from 'next/link';
import LoginLink from './login/components/LoginLink';
import '@/lib/db';

function Home() {
  return (
    <main className='flex flex-col items-center justify-between h-screen py-32 bg-[#E6ECF4]'>
      <div style={{ position: 'relative', width: '300px', height: '500px' }}>
        <Image
          alt='스플래시 이미지'
          src='https://github.com/kimfield98/MYPJT3-BOBBUDDY/blob/main/public/%EB%B0%A5%EB%B2%84%EB%94%94.png?raw=true'
          width={300}
          height={500}
          priority
        />
      </div>
      <div className='flex flex-col gap-10 items-center text-[#5f7a85]'>
        <Link href='/create-account'>
          <button className='w-60 px-7 py-3 rounded-full border border-[#758A94] bg-[#758A94] text-white hover:font-semibold hover:bg-transparent hover:border hover:border-[#758A94] hover:text-[#5f7a85]'>
            시작하기
          </button>
        </Link>
        <LoginLink />
      </div>
    </main>
  );
}

export default Home;
