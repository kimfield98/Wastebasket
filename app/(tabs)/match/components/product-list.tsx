'use client';

import getMoreProducts from '../actions';
import { initialProducts } from '../page';
import ProductCard from './product-card';

export default function ProductList({
  initialProducts,
}: {
  initialProducts: initialProducts;
}) {
  return (
    <div>
      <div className='flex flex-col gap-5'>
        {initialProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <form action={getMoreProducts} className='flex justify-center'>
        <button className='px-5 my-10 h-10 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-400'>
          더보기
        </button>
      </form>
    </div>
  );
}
