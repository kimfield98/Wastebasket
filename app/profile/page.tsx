import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound } from 'next/navigation';
import { logout } from './actions';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  return (
    <div>
      <h1>{user?.username}의 프로필</h1>
      <form action={logout}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
