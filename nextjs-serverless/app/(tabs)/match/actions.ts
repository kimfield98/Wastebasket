'use server';

import db from '@/lib/db';

export default async function getMoreProducts(page: number) {
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
    take: 6,
    skip: page * 6,
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return products;
}
