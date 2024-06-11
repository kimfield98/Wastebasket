'use server';

import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const cookie = await getSession();
  await cookie.destroy();
  redirect('/');
};
