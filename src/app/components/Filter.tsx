"use client";

import React from "react";
import FilterToggle from "./FiterToggle";
import FilterTag from "./FilterTag";
import FilterDragbar from "./FilterDragbar";


export const FilterBar = () => {

  return (
    <div className="flex flex-col gap-3 pt-3">
      <FilterToggle />
      <FilterTag />
      <FilterDragbar />
    </div>
  );
};

export default FilterBar;