"use client"

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const images = [
  '지진.png',
  '화산.png',
  '홍수.png',
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const imageStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' ,display: 'flex', alignItems: 'center', }}>
      <div className=' opacity-60 bg-black'>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          style={{
            ...imageStyle,
            backgroundImage: `url(${imageUrl})`,
            zIndex: index === currentImageIndex ? 1 : 0,
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        ></div>
      ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex: 2, color: '#fff', textAlign:"center"}}>
        <h1 className='text-[1.5rem] w-[100vw] sm:text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem] sm:break-words xl:text-[5.5rem] !'>세계 재난재해 아카이브</h1>
        <h1 className='text-[1.5rem] w-[100vw] sm:text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem] sm:break-words xl:text-[5.5rem]'>및 실시간 알림 </h1>
        <div className='mt-8'>
          <Link href='/earth'>
            <span className=' rounded-full bg-slate-300/50 inline-block sm:text-[1.5rem] border-2 sm:px-[15px] sm:py-[10px] px-[10px] py-[5px] text-[1rem] hover:bg-sky-800/50'>
            지구로 이동하기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

