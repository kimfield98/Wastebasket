'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CreateAccountLink from '@/app/(auth)/create-account/components/CreateAccountLink';
import { useFormState } from 'react-dom';
import { login } from '../actions';

function LoginForm() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <form
      action={dispatch}
      className='flex flex-col items-center text-[#5f7a85]'
    >
      <Input
        name='email'
        type='email'
        placeholder='이메일을 입력해주세요'
        errors={state?.fieldErrors.email}
      />
      <Input
        name='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        errors={state?.fieldErrors.password}
      />
      <Button className='my-10'>로그인</Button>
      <CreateAccountLink />
    </form>
  );
}

export default LoginForm;
