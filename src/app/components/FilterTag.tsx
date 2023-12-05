"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { disasters } from "../constants/disaster";
import { useRecoilState } from "recoil";
import { filterState } from '../recoil/dataRecoil';


export const FilterTag = () => {
  const [filtering, setFiltering] = useRecoilState(filterState);
  const [selectDisasters, setSelectDisasters] = useState<string[]>(filtering.selectedDisaster || []);


  // 재난 유형 선택 핸들러
  const handleDisasterSelect = (disasterType: string) => {
    const updatedDisasters = selectDisasters.includes(disasterType)
      ? selectDisasters.filter(type => type !== disasterType)
      : [...selectDisasters, disasterType];
    setSelectDisasters(updatedDisasters);
    setFiltering({ ...filtering, selectedDisaster: updatedDisasters });
  };


  return (
      <div className="flex gap-3 flex-wrap">
        {disasters.map((disaster) => (
            <Button 
              key={disaster.type} 
              color="primary" 
              size="sm" 
              radius="full"
              variant={!selectDisasters.includes(disaster.type) ? undefined:"bordered"}
              onClick={() => handleDisasterSelect(disaster.type)}
            >
            {disaster.type}
          </Button>
        ))}
      </div>
  );
};

export default FilterTag;