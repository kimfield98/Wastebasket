import db from '@/lib/db';
import ListProduct from './components/list-product';

// todo: 데이터 캐싱
// todo: 페이지네이션
// todo: 무한 스크롤
async function getProducts() {
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
  });
  return products;
}

export default async function Match() {
  const products = await getProducts();
  return (
    <div>
      <h1>Match</h1>
      {products.map(product => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
}
