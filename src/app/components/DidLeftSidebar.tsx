"use client";

import React, {useCallback, useState} from 'react';
import { useRecoilValue } from 'recoil';
import { dataState } from '../recoil/dataRecoil';
import Link from 'next/link';
import DidVideo from './DidVideo';
import DidArticle from './DidAirticle';
import { Accordion, AccordionItem } from '@nextui-org/react';


interface didDetailProps {
  dID: string;
}

const DidLeftSidebar: React.FC<didDetailProps>= ({ dID }) => {
  const data = useRecoilValue(dataState);
  const filteredData = data.filter((item) => item.dID === dID);
  if (dID === null) return null;

  const [width, setWidth] = useState<number>(27);

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
    <div id="drageRight" style={{ width: `${width}px` }} className=' custom-scrollbar absolute left-0 top-0 z-20 flex flex-col h-screen min-w-[20%] max-w-[50%] overflow-auto bg-dark-2 px-4 pb-5 pt-14'>
      <div className='absolute right-0 top-0 w-2 h-full cursor-ew-resize' onMouseDown={startResize}></div>
      <div className='text-heading3-bold text-light-1 px-3 py-6 select-none'>Disaster Detail</div>
      <div className='filterbar'>
      {filteredData.length > 0 ? (
      <div>
        <Accordion selectionMode="multiple" variant="splitted" >
          <AccordionItem key="1" aria-label="Accordion 1" className='text-black'>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="설명" className='text-black'>
            <div>{filteredData[0].dCountry}</div>
          <div>{filteredData[0].dDate}</div>
          <div>{filteredData[0].dDescription}</div>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="관련 기사" className='text-black'>
            <Link target='_blank'  href={filteredData[0].dUrl}>{filteredData[0].dUrl}</Link>
            <DidArticle dID={filteredData[0].dID} />
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 4" title="관련 영상" className='text-black'>
            <DidVideo dID={filteredData[0].dID} />
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