'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoginLink from '@/app/login/components/LoginLink';
import { useFormState } from 'react-dom';
import { createAccount } from '../actions';

function CreateAccountForm() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <form
      action={dispatch}
      className='flex flex-col items-center text-[#5f7a85]'
    >
      <Input
        name='username'
        type='text'
        placeholder='이름을 입력해주세요'
        errors={state?.fieldErrors.username}
      />
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
      <Input
        name='confirmPassword'
        type='password'
        placeholder='비밀번호를 다시 입력해주세요'
        errors={state?.fieldErrors.confirmPassword}
      />
      <Button className='my-10'>회원가입</Button>
      <LoginLink />
    </form>
  );
}
export default CreateAccountForm;
