import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const user = await db.sMSToken.create({
    data: {
      token: "1234",
      userId: 1,
    },
  })
}
test();

export default db;