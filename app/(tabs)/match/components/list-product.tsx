import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatPriceKR } from '@/lib/utils';

interface Props {
  image: string;
  title: string;
  description: string;
  location: string;
  price: number;
  updatedAt: Date;
  user: {
    username: string;
  };
}

export default function ListProduct({
  image,
  title,
  description,
  location,
  price,
  updatedAt,
  user: { username },
}: Props) {
  const id = 1;
  return (
    <Link
      href={`/match/${id}`}
      className='flex gap-3 items-center border-4 rounded-md p-3'
    >
      <div className='relative size-28 rounded-xl overflow-hidden'>
        <Image src={image} alt='커버 이미지' fill />
      </div>
      <div className='flex flex-col gap-0.5 text-white text-sm'>
        <div className='flex gap-2 items-center text-yellow-500'>
          <p className='font-semibold text-lg'>{title}</p>
          <p className=''>{formatPriceKR(price)} 원</p>
        </div>
        <div>{description}</div>
        <div>{location}</div>
        <div className='flex justify-between gap-2 max-w-48 text-nowrap overflow-hidden'>
          <p>{formatDate(updatedAt)}</p>
          <p>|</p>
          <p className='font-semibold'>{username}</p>
        </div>
      </div>
    </Link>
  );
}
