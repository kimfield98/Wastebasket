import db from '@/lib/db';
import ProductList from './components/product-list';
import { Prisma } from '@prisma/client';

export type initialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

async function getInitialProducts() {
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
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return products;
}

export default async function Match() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <div className='text-2xl font-bold mb-5 px-1'>Match</div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
