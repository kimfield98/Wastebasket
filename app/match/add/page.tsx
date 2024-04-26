'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function AddProduct() {
  return (
    <div>
      <form className='p-5 flex flex-col gap-5'>
        <label
          htmlFor='image'
          className='border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer'
        >
          <PhotoIcon className='w-20' />
          <div className='text-neutral-400 text-sm'>사진을 추가해주세요.</div>
        </label>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          className='hidden'
        />
        <Input name='title' required placeholder='식사 종류' type='text' />
        <Input name='price' type='number' required placeholder='가격' />
        <Input name='location' type='text' required placeholder='모임 장소' />
        <Input
          name='description'
          type='text'
          required
          placeholder='자세한 설명'
        />
        <Button text='작성 완료' />
      </form>
    </div>
  );
}
