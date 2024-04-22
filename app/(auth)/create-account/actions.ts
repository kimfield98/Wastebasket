'use server';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

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

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = await createAccountSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect('/profile');
  }
}
