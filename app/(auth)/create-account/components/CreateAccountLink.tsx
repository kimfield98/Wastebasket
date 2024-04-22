import Link from 'next/link';

function CreateAccountLink() {
  return (
    <Link href='/create-account'>
      <span>아직 계정이 없으신가요?&nbsp;</span>
      <span className='font-semibold underline underline-offset-4'>
        회원가입하기
      </span>
    </Link>
  );
}
export default CreateAccountLink;
