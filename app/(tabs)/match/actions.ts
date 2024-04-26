'use server';

import db from '@/lib/db';

export default async function getMoreProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      image: true,
      title: true,
      description: true,
      location: true,
      price: true,
      updatedAt: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 2,
    skip: 2,
    orderBy: {
      updatedAt: 'desc',
    },
  });
}
