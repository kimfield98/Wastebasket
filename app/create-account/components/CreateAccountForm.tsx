import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CreateAccountForm() {
  return (
    <form className='flex flex-col items-center'>
      <Input placeholder='이름을 입력해주세요' />
      <Input type='email' placeholder='이메일을 입력해주세요' />
      <Input type='password' placeholder='비밀번호를 입력해주세요' />
      <Button className='w-80 my-5 bg-[#5F7A85]'>회원가입</Button>
      <Link href='/login' className='text-[#758A94] font-semibold'>
        이미 계정이 있으신가요?{' '}
        <span className='font-semibold underline'>로그인</span>
      </Link>
    </form>
  );
}
export default CreateAccountForm;
