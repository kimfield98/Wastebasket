import Link from 'next/link';
import Image from 'next/image';

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
  const date = updatedAt.toISOString().split('T')[0];
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
          <p className=''>{price}</p>
        </div>
        <div>{description}</div>
        <div>{location}</div>
        <div className='flex justify-between gap-2'>
          <p className=''>{date}</p>
          <p>|</p>
          <p className='font-semibold'>{username}</p>
        </div>
      </div>
    </Link>
  );
}
