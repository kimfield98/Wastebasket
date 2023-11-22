"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
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
        console.log("국가 재난 데이터 가져오기 성공");
      } catch(error) {
        console.log("국가 재난 데이터 가져오기 실패", error);
      }
    };
    if (pathSegments[2]) {
      getDisasterElem();
    }
  }, [pathname]);
  return (
    <>
      <div className='w-full max-w-4xl my-5'>
        <div className='flex flex-1 flex-col justify-'>
          <h3 className='text-heading4-medium text-light-1'>재난 리스트</h3>
          <div className=' pt-4 items-center grid gap-5 grid-cols-12 justify-items-center'>
            <p className=" text-light-3 col-span-1 text-cetner">상태</p>
            <p className=" text-light-3 col-span-7 text-center">재난 종류</p>
            <p className=" text-light-3 col-span-4 text-center ">날짜</p>
          </div>
          <div className='mt-7 flex w-full flex-col gap-9 overflow-y-auto max-h-[55vh]'>
          {disasterElem.map((data, index) => {
              const statusColor = data.dStatus === 'past' ? 'bg-yellow-500' : 'bg-red-500';
              return (
                <div key={index} className=' items-center grid gap-5 grid-cols-12'>
                  <div className=" w-full flex justify-center">
                    <div className={`h-2.5 w-2.5 ${statusColor} rounded-full col-span-1`}></div>
                  </div>
                  <p className=" text-light-3 col-span-7 items-start ">{data.dType}</p>
                  <p className=" text-light-3 col-span-4 text-center ">{data.dDate}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default DisastersFilter;