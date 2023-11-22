import React from 'react';
import dynamic from 'next/dynamic';
import EarthCanvas from '../components/EarthPin';

const DynamicEarthCanvas = dynamic(
  () => import('../components/EarthPin'),
  { loading: () => <p>Loading...</p> }
);

export default function Live() {

  return (
    <>
      <div className='h-[100vh] flex items-center justify-center'>
        <EarthCanvas/>
      </div>
    </>
  )
}