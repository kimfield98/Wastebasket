'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { createAccount } from './actions';
import { useFormState } from 'react-dom';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>회원가입</h1>
        <h2 className='text-xl'>가입을 위한 정보를 입력해주세요.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='username'
          type='text'
          placeholder='이름'
          required
          errors={state?.fieldErrors.username}
        />
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
          maxLength={6}
          errors={state?.fieldErrors.password}
        />
        <Input
          name='confirmPassword'
          type='password'
          placeholder='비밀번호 확인'
          required
          minLength={6}
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text='회원가입' />
      </form>
      <SocialLogin />
    </div>
  );
}
