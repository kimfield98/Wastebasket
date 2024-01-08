"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface Info {
  dTitle: string;
  dCountryCode: string;
  dCountry: string;
  dType: string;
  dDate: string;
  dStatus: string;
  dDescription: string;
  dLatitude: number;
  dLongitude: number;
  dUrl: string;
}

const DisastersFilter: React.FC = () => {
  const [disasterElem, setDisasterElem] = useState<Info[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const getDisasterElem = async () => {
      try {
        const res = await axios(`https://worldisaster.com/api/disasters/${pathSegments[2]}`);
        const sortedData = res.data.sort((a: Info, b: Info) => {
          return b.dDate.localeCompare(a.dDate);
        });
        setDisasterElem(sortedData);
      } catch (error) {
        console.log("Failed to retrieve national disaster data", error);
      }
    };
    if (pathSegments[2]) {
      getDisasterElem();
    }
  }, [pathname]);

  return  (
    <>
      <div className='w-full max-w-4xl my-5'>
        <div className='flex flex-1 flex-col'>
          <div className='pt-4 items-center grid gap-5 grid-cols-12 justify-items-center'>
            <p className="text-light-3 col-span-1 text-center">Status</p>
            <p className="text-light-3 col-span-7 text-center">Type of Disaster</p>
            <p className="text-light-3 col-span-3 text-center">Date</p>
          </div>
          <div className='flex w-full flex-col gap-9 overflow-y-auto max-h-[55vh]'>
            <Accordion variant="light">
              {disasterElem.map((data, index) => {
                const statusColor = data.dStatus === 'past' ? 'bg-yellow-500' : 'bg-red-500';
                const descriptionData = data.dDescription === null ? 'No description' : data.dDescription;
                return (
                  <AccordionItem key={index} className="text-light-3" aria-label=""
                    title={
                      <div className='items-center grid gap-5 grid-cols-12'>
                        <div className="w-full flex justify-center">
                          <div className={`h-2.5 w-2.5 ${statusColor} rounded-full col-span-1`}></div>
                        </div>
                        <div className="flex justify-center col-span-7"> {/* Centering content */}
                          <p className="text-light-3">{data.dType}</p>
                        </div>
                        <p className="text-light-3 col-span-4 text-center">{data.dDate}</p>
                      </div>
                    }>
                    <div className='flex flex-col'>
                      <div className="my-3">
                        <div className='text-heading4-medium'>Description</div>
                        <p className="text-light-3 col-span-11 items-start">{descriptionData}</p>
                      </div>
                      <div className="my-3">
                        <div className='text-heading4-medium'>Report</div>
                        <a href={data.dUrl} className="border-b border-gray-500 text-light-3 col-span-11 items-start hover:text-slate-200 active:text-light-1">View</a>
                      </div>
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisastersFilter;

