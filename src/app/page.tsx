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
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, color: '#fff', textAlign: "center" }}>
        <h1 className='text-[1.5rem] w-[100vw] sm:text-[2.5rem] md:text-[3.5rem]  lg:text-[4rem] sm:break-words xl:text-[4rem]  leading-normal font-bold !'>Global Disasters Portal</h1>
        <h1 className='text-[1rem] w-[100vw] sm:text-[2rem] md:text-[3rem]  lg:text-[3rem] sm:break-words xl:text-[3.5rem]  font-medium'>Real-time Alerts & Historical Archives</h1>
        <div className='mt-8'>
          <Link href='/earth'>
            <span className='inline-block rounded-full bg-slate-300/50 border-2 border-transparent hover:border-sky-800 text-[1rem] sm:text-[1.5rem] px-[10px] sm:px-[15px] py-[5px] sm:py-[10px] hover:bg-sky-800/50 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>
              Explore
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

