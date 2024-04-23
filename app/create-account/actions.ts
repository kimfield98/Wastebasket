'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

export const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '이름을 다시 입력해주세요',
        required_error: '이름을 입력해주세요',
      })
      .toLowerCase()
      .trim()
      .min(2, { message: '이름은 2자 이상입니다.' }),
    email: z
      .string()
      .email({ message: '올바른 이메일 형식을 입력해주세요.' })
      .toLowerCase(),
    password: z.string().min(6, { message: '비밀번호는 6자 이상입니다.' }),
    confirmPassword: z
      .string()
      .min(6, { message: '비밀번호는 6자 이상입니다.' }),
  })
  .refine(checkPasswords, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log('회원가입 성공');
    redirect('/profile');
  }
}
