"use client";

import React, { useState } from "react";
import { Switch } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { filterState, yearState } from '../recoil/dataRecoil';


export const FilterToggle = () => {
  const [rememberYear,setRememberYear] = useRecoilState<number>(yearState);
  const [filtering, setFiltering] = useRecoilState(filterState);
  const [selectLive, setSelectLive] = useState<boolean>(filtering.selectedLive);

  // 실시간 상태 토글 핸들러
  const handleLiveToggle = (isLive: boolean) => {
    setSelectLive(isLive);
    
    if (isLive){
      setRememberYear(filtering.selectedYear);
      setFiltering({ ...filtering, selectedLive: isLive, selectedYear: 2023 });
    } else {
      setFiltering({ ...filtering, selectedLive: isLive, selectedYear: rememberYear });
    }
  };

  return (
      <div>
        <Switch isSelected={selectLive} onValueChange={handleLiveToggle} defaultSelected={selectLive} size="lg">
          <p>
          {selectLive ? (
            <span className="text-white">실시간 재난 상황을 확인 중이에요 👀</span>
          ) : (
            <span className="text-white">Click! 현재 진행 중인 재난 상황🚨</span>
          )}
          </p>
        </Switch>
      </div>
  );
};

export default FilterToggle;