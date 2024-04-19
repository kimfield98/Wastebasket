import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CreateAccountLink from '@/app/create-account/components/CreateAccountLink';

function LoginForm() {
  return (
    <form className='flex flex-col items-center text-[#5f7a85]'>
      <Input name='email' type='email' placeholder='이메일을 입력해주세요' />
      <Input
        name='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
      />
      <Button className='my-10'>로그인</Button>
      <CreateAccountLink />
    </form>
  );
}

export default LoginForm;
