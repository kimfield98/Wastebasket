import db from '@/lib/db';
import ProductList from '../../../components/product-list';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

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
      <div className='flex justify-between items-center mb-5 px-1'>
        <div className='text-2xl font-bold'>Match</div>
        <Link
          href='/match/add'
          className='flex items-center justify-center rounded-full size-12 text-white transition-colors bg-yellow-500  hover:bg-yellow-400'
        >
          <PlusIcon className='size-10' />
        </Link>
      </div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
