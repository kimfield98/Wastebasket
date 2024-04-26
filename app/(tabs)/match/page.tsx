import db from '@/lib/db';
import ListProduct from './components/list-product';

// todo: 데이터 캐싱
// todo: 페이지네이션
// todo: 무한 스크롤
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
    take: 2,
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
      <div className='flex flex-col gap-5'>
        {initialProducts.map(product => (
          <ListProduct key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
