"use client";

import React, {useCallback, useState} from 'react';
import { useRecoilValue } from 'recoil';
import { DataType, dataState } from '../recoil/dataRecoil';
import Link from 'next/link';
import DidVideo from './DidVideo';
import DidArticle from './DidAirticle';
import { Accordion, AccordionItem} from '@nextui-org/react';

interface didDetailProps {
  onClose?: () => void;
  dID: string;
}

const DidLeftSidebar: React.FC<didDetailProps>= ({ onClose, dID }) => {
  const data = useRecoilValue(dataState);
  const filteredData = data.filter((item) => item.dID === dID);
  const detailData:DataType = filteredData[0];
  if (dID === null) return null;

  const [width, setWidth] = useState<number>(30);

  const startResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startWidth = width;

    const doResize = (e: MouseEvent) => {
      const currentWidth = startWidth + (e.clientX - startX);
      setWidth(currentWidth);
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', doResize);
      window.removeEventListener('mouseup', stopResize);
    };

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
  }, [width]);
      
  return (
    <div id="drageRight" style={{ width: `${width}px` }} className='min-w-full custom-scrollbar absolute left-0 top-0 z-20 flex flex-col h-screen md:min-w-[30%] md:max-w-[50%] overflow-auto bg-dark-2 px-4 pb-5'>
      <div className='absolute right-0 top-0 w-3 h-full cursor-ew-resize hover:bg-slate-500 ' onMouseDown={startResize}></div>
      <div className='bg-dark-2 w-[100%] sticky pt-20 pb-4 top-0 text-heading3-bold text-light-1 select-none z-10 flex place-content-between'>
        <div className='inline-flex'>Disaster Detail
          <img className='rounded-xl w-8' src={`/Disaster/${detailData.dType}.png`} alt="disaster" />
        </div>
      <button onClick={onClose}>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-light-1 hover:text-light-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
      <div className='filterbar'>
      {detailData ? (
      <div className='p-2 bg-gray-300 rounded-xl'>
        <div className=' p-4 rounded-xl bg-white text-gray-600/80 mb-3'><span className=' text-black'>Type: </span>{detailData.dType}</div>
        <Accordion selectionMode="multiple"	className='text-gray-600/80 bg-white rounded-xl select-none' >
          <AccordionItem key="2" aria-label="Accordion 2" title="설명" className='text-gray-600/80 select-none mt-2'>
            <table>
              <tbody>
                <tr>
                  <td className="min-w-auto bold text-black mb-2">Country:</td>
                  <td>{detailData.dCountry}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black mb-2">Date:</td>
                  <td>{detailData.dDate}</td>
                </tr>
                <tr>
                  <td className=" align-top start text min-w-auto bold text-black mb-2">Description:</td>
                  <td className="truncate">{detailData.dDescription}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black mb-2"></td>
                  <td>{detailData.dUrl==null? null:<a target='_blank' href={detailData.dUrl} className='hover:text-dark-1'> ...새창에서 더보기</a>}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black mb-2">Alert Level:</td>
                  <td>{detailData.dAlertLevel || "null"}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black">Lat:</td>
                  <td>{detailData.dLatitude.toFixed(4)}</td>
                </tr>
                <tr>
                  <td className="min-w-auto bold text-black">Lon:</td>
                  <td>{detailData.dLongitude.toFixed(4)}</td>
                </tr>
              </tbody>
            </table>
            
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="관련 기사" className='text-gray-600/80 select-none'>
            <DidArticle dID={detailData.dID} />
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 4" title="관련 영상" className='text-gray-600/80 select-none'>
            <DidVideo dID={detailData.dID} />
          </AccordionItem>
        </Accordion>
      </div>
      ) : (
      <span className='flex justify-center mt-60 select-none'>Click on the Pin 👉</span>
    )}
      </div>
    </div>
  );
};

export default DidLeftSidebar;