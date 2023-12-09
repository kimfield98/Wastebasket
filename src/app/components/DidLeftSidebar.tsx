"use client";

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { DataType, dataState } from '../recoil/dataRecoil';
import DidVideo from './DidVideo';
import DidArticle from './DidAirticle';
import { Accordion, AccordionItem } from "@nextui-org/accordion"

interface didDetailProps {
  dID: string;
}

const DidLeftSidebar: React.FC<didDetailProps> = ({ dID }) => {
  const data = useRecoilValue(dataState);
  const filteredData = data.filter((item) => item.dID === dID);
  const detailData: DataType = filteredData[0];
  if (dID === null) return null;

  return (
    <div className='min-w-full custom-scrollbar absolute left-0 top-0 z-20 flex flex-col h-screen md:min-w-[33%] md:max-w-[33%] overflow-auto bg-dark-2 px-4 pb-5 '>
      <div className='bg-dark-2 sticky pt-20 pb-4 top-0 text-heading3-bold text-light-1 select-none z-10 flex place-content-between'></div>
      <div className='filterbar'>
        {detailData ? (
          <div className='p-2 bg-gray-300 rounded-xl'>
            <div className=' p-4 rounded-xl bg-white text-gray-600/80 mb-3 flex items-center justify-between'>
              <div>
                <span className=' text-black'>Type: </span> {detailData.dType}
              </div>
              <img className='rounded-xl w-8' src={`/Disaster/${detailData.dType}.png`} alt="disaster" />
            </div>
            <Accordion selectionMode="multiple" className='text-gray-600/80 bg-white rounded-xl select-none' >
              <AccordionItem key="2" aria-label="Accordion 2" title="Summary" className='text-gray-600/80 select-none mt-2'>
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
                      <td className=" align-top start text min-w-auto bold text-black mb-2">Details:</td>
                      <td className="truncate">{detailData.dDescription}</td>
                    </tr>
                    <tr>
                      <td className="min-w-auto bold text-black mb-2"></td>
                      <td>{detailData.dUrl == null ? null : <a target='_blank' href={detailData.dUrl} className='hover:text-dark-1'> ...more</a>}</td>
                    </tr>
                    <tr>
                      <td className="min-w-auto bold text-black mb-2">Alert Level:</td>
                      <td>{detailData.dAlertLevel || "null"}</td>
                    </tr>
                    <tr>
                      <td className="min-w-auto bold text-black">Latitude:</td>
                      <td>{detailData.dLatitude.toFixed(4)}</td>
                    </tr>
                    <tr>
                      <td className="min-w-auto bold text-black">Longitude:</td>
                      <td>{detailData.dLongitude.toFixed(4)}</td>
                    </tr>
                  </tbody>
                </table>
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="News & Updates" className='text-gray-600/80 select-none'>
                <DidArticle dID={detailData.dID} />
              </AccordionItem>
              <AccordionItem key="4" aria-label="Accordion 4" title="Relevant Videos" className='text-gray-600/80 select-none'>
                <DidVideo dID={detailData.dID} />
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <span className='flex justify-center mt-60 select-none'>Click a disaster pin to continue.</span>
        )}
      </div>
    </div>
  );
};

export default DidLeftSidebar;