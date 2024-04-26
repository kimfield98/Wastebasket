'use client';

import { useState } from 'react';
import { initialProducts } from '../page';
import getMoreProducts from '../actions';
import ProductCard from './product-card';

export default function ProductList({
  initialProducts,
}: {
  initialProducts: initialProducts;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const handleButtonClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length !== 0) {
      setPage(prev => prev + 1);
      setProducts(prev => [...prev, ...newProducts]);
    } else {
      setLastPage(true);
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col gap-5'>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
      {lastPage ? (
        '마지막 페이지입니다.'
      ) : (
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className='text-sm font-semibold bg-yellow-500 w-fit mx-auto px-5 py-2 rounded-md hover:opacity-90 active:scale-95'
        >
          {isLoading ? '로딩 중' : '더보기'}
        </button>
      )}
    </div>
  );
}
