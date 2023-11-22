import React from 'react';
import EarthCanvas from '../components/EarthPin';

export default function Home() {

  return (
    <>
      <div className='h-[100vh] flex items-center justify-center'>
        <EarthCanvas/>
      </div>
    </>
  )
}