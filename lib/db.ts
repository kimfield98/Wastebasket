import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const test = async () => {
  const user = await db.user.create({
    data: {
      email: 'test@test.com',
      username: 'test',
      password: '123456',
    },
  });
  console.log(user);
}
test();

export default db;
