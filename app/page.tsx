import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen bg-[#e6ecf4] text-gray-600 font-medium'>
      <div className='sm:w-[400px]'>
        <Image
          src='/밥버디.png'
          alt='스플래시 이미지'
          width={1587}
          height={2245}
          layout='responsive'
        />
      </div>
    </main>
  );
}
