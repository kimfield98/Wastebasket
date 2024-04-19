import Image from 'next/image';
import Link from 'next/link';
import LoginLink from './login/components/LoginLink';

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
