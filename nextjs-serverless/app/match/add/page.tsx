'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { uploadProduct } from './actions';

export default function AddProduct() {
  const [previewImage, setPreviewImage] = useState('');
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      alert('파일 크기는 1MB 이하여야 합니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일을 업로드해주세요.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };
  return (
    <div>
      <form action={uploadProduct} className='p-5 flex flex-col gap-5'>
        <label
          htmlFor='image'
          className='border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover bg-no-repeat'
          style={{ backgroundImage: `url(${previewImage})` }}
        >
          {previewImage === '' ? (
            <>
              <PhotoIcon className='w-20' />
              <div className='text-neutral-400 text-sm'>
                사진을 추가해주세요.
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={uploadImage}
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
