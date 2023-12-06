"use client";

import React, { useState } from "react";
import { Slider } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { filterState, yearState } from '../recoil/dataRecoil';


export const FilterDragbar = () => {
  const [filtering, setFiltering] = useRecoilState(filterState);
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);


  // 연도 선택 핸들러
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setFiltering({ ...filtering, selectedYear: year });
  };

  return (
    <div className="max-w-full p-3">
      <Slider
        label="Slide to see disasters by year."
        size="sm"
        maxValue={2023}
        minValue={2000}
        getValue={(year) => `${year} / 2023`}
        value={selectedYear}
        onChange={(newYear) => {
          const year = Array.isArray(newYear) ? newYear[0] : newYear;
          handleYearChange(year);
        }}
        className="max-w-md text-white"
      />
    </div>
  );
};

export default FilterDragbar;