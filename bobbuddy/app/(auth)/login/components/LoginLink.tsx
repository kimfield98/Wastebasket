import Link from 'next/link';

function LoginLink() {
  return (
    <Link href='/login'>
      <span>이미 계정이 있으신가요?&nbsp;</span>
      <span className='font-semibold underline underline-offset-4'>
        로그인하기
      </span>
    </Link>
  );
}
export default LoginLink;
