'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  email: z
    .string({
      required_error: '이메일을 입력해주세요',
    })
    .email({
      message: '올바른 이메일 형식을 입력해주세요.',
    })
    .toLowerCase(),
  password: z
    .string({
      required_error: '비밀번호를 입력해주세요',
    })
    .min(6, {
      message: '비밀번호는 6자 이상입니다.',
    }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log('로그인 성공');
    redirect('/profile');
  }
}
