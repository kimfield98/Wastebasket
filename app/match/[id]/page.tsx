import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatDate, formatPriceKR } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getIsOwner(userId: number) {
  const cookie = await getSession();
  if (cookie.id) {
    return cookie.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  return (
    <div>
      <div className='relative aspect-square'>
        <Image src={product.image} alt={product.title} fill />
      </div>

      <div className='flex items-center gap-3 p-5 border-b border-neutral-700'>
        <p className='size-10 overflow-hidden rounded-full'>
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              alt={product.user.username}
              width={40}
              height={40}
            />
          ) : (
            <UserIcon />
          )}
        </p>
        <p className='text-lg'>{product.user.username}</p>
      </div>

      <div className='p-5'>
        <p className='mb-1 text-2xl font-semibold'>{product.title}</p>
        <p>모임 장소 - {product.location}</p>
      </div>

      <div className='border-b border-neutral-700 p-5 font-semibold'>
        {product.description}
      </div>

      <div className='flex justify-between w-full p-5 pb-28'>
        <div className='text-neutral-400'>
          최종 수정 : {formatDate(product.updatedAt)}
        </div>
      </div>

      <div className='fixed w-full bottom-0 left-0 p-5 bg-neutral-800 flex justify-between items-center'>
        <p className='font-semibold text-xl'>
          {formatPriceKR(product.price)}원
        </p>
        <p className='flex gap-5'>
          {isOwner ? (
            <button className='bg-red-500 px-5 py-2 rounded-md text-white font-semibold'>
              삭제하기
            </button>
          ) : null}
          <Link
            className='bg-yellow-500 px-5 py-2 rounded-md text-white font-semibold'
            href='/chat'
          >
            채팅하기
          </Link>
        </p>
      </div>
    </div>
  );
}
