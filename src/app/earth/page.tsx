"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import MailAlertList from '../components/MailAlertModule';

const DynamicEarthCanvas = dynamic(
  () => import('../components/EarthCesium'),
  { loading: () => <p>Loading...</p> }
);

export default function Home() {
  return (
    <div>
      <div className=' w-[40%] fixed bottom-0 left-0 z-50'>
        <MailAlertList/>
      </div>
      <DynamicEarthCanvas/>
    </div>
  )
}