import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
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
      <div className='flex flex-col gap-10 items-center justify-center'>
        <Link href='/create-account'>
          <Button
            sx={{
              color: 'white',
              bgcolor: '#758A94',
              ':focus': {
                backgroundColor: '#758A94',
              },
              ':hover': {
                backgroundColor: '#758A94',
              },
            }}
            variant='contained'
            size='large'
          >
            시작하기
          </Button>
        </Link>

        <Link href='/login' color='inherit' underline='none'>
          <span>이미 계정이 있나요?</span>
          <span>&nbsp;로그인하기</span>
        </Link>
      </div>
    </main>
  );
}
