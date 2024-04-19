'use server';

import { z } from 'zod';

const createAccountSchema = z
  .object({
    username: z
      .string({
        required_error: '이름을 입력해주세요',
      })
      .min(2, { message: '이름은 2자 이상이어야 합니다' })
      .trim(),
    email: z
      .string({
        required_error: '이메일을 입력해주세요',
      })
      .email({ message: '이메일 형식이 올바르지 않습니다' })
      .toLowerCase(),
    password: z
      .string({ required_error: '비밀번호를 입력해주세요' })
      .min(6, { message: '비밀번호는 6자 이상이어야 합니다' }),
    confirmPassword: z
      .string({ required_error: '비밀번호를 입력해주세요' })
      .min(6, { message: '비밀번호는 6자 이상이어야 합니다' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const res = createAccountSchema.safeParse(data);
  if (!res.success) {
    return res.error.flatten();
  } else {
    console.log('createAccount', res.data);
  }
};
