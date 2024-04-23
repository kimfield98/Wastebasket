'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { login } from './actions';

export default function LogIn() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>로그인</h1>
        <h2 className='text-xl'>이메일과 비밀번호를 입력해주세요.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='email'
          type='email'
          placeholder='이메일'
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name='password'
          type='password'
          placeholder='비밀번호'
          required
          minLength={6}
          errors={state?.fieldErrors.password}
        />
        <Button text='로그인' />
      </form>
      <SocialLogin />
    </div>
  );
}
