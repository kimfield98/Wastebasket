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
  return (
    <Link
      href={`/match/${id}`}
      className='flex gap-3 items-center border-4 rounded-md p-3'
    >
      <div className='relative size-28 rounded-xl overflow-hidden'>
        <Image src={image} alt='커버 이미지' fill />
      </div>
      <div className='flex flex-col text-white'>
        <p className='font-semibold text-lg text-yellow-500'>{title}</p>
        <p className='text-sm'>{description}</p>
        <p className='text-sm mt-1'>
          <span>{location}</span>
          <span>&nbsp; | &nbsp;</span>
          <span className='text-yellow-400'>{price}</span>
        </p>
        <p className='text-sm mt-1 font-semibold'>{username}</p>
      </div>
    </Link>
  );
}
