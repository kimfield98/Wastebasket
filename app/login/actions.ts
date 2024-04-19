'use server';

import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({
      required_error: '이메일을 입력해주세요',
    })
    .email({ message: '이메일 형식이 올바르지 않습니다' })
    .toLowerCase(),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요' })
    .min(6, { message: '비밀번호는 6자 이상이어야 합니다' }),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = loginSchema.safeParse(data);
  if (!res.success) {
    return res.error.flatten();
  } else {
    console.log('login', res.data);
  }
};
