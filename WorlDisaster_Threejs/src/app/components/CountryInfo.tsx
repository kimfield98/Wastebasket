"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

// Define an interface for the country information
interface CountryInfo {
  cCountry: string;
  cCode: string;
  cContinent: string;
  cGDP: string | number;
  cPopulation: string | number;
  cLocation: string;
  cGeoCoordinates: string;
}

const CountryInfo: React.FC = () => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const getCountry = async () => {
      try {
        const res = await axios(`https://worldisaster.com/api/country/${pathSegments[2]}`);
        setCountryInfo(res.data);
        console.log("국가 데이터 가져오기 성공");
      } catch(error) {
        console.log("국가 데이터 가져오기 실패", error);
      }
    };

    if (pathSegments[2]) {
      getCountry();
    }
  }, [pathname]);

  console.log(countryInfo);

  return (
    <>
      <div className='w-full max-w-4xl my-5'>
        <div className='flex flex-1 flex-col justify-start'>
          {countryInfo && (
            <>
              <h3 className='text-heading4-medium'>{countryInfo.cCountry}</h3>
              <div className='mt-7 flex flex-col max-w-4xl gap-7 p-3'>
                <p className='text-light-3'>
                  <label>Continent:</label> {countryInfo.cContinent}
                </p>
                <p className='text-light-3'>
                  <label>GDP:</label> {countryInfo.cGDP}
                </p>
                <p className='text-light-3'>
                  <label>Population:</label> {countryInfo.cPopulation}
                </p>
                <p className='text-light-3'>
                  <label>Location:</label> {countryInfo.cLocation}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CountryInfo;