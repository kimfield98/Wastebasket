'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const formSchema = z.object({
  email: z
    .string({
      required_error: '이메일을 입력해주세요',
    })
    .email({
      message: '올바른 이메일 형식을 입력해주세요.',
    })
    .toLowerCase()
    .refine(checkEmailExist, {
      message: '존재하지 않는 이메일입니다.',
    }),
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
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const passwordMatch = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx',
    );
    if (passwordMatch) {
      const cookie = await getSession();
      cookie.id = user!.id;
      await cookie.save();
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호가 일치하지 않습니다.'],
          email: [],
        },
      };
    }
  }
}
