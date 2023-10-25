"use client";

import React from "react";
import { Accordion, AccordionItem, Switch, Slider, Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { nations } from "../constants/nation";
import { disasters } from "../constants/disaster";

const LeftSidebar = () => {

  const [isSelected, setIsSelected] = React.useState(true);

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title="검색을 통해 국가로 이동">
          <Autocomplete
            variant="underlined"
            label="국가로 바로 이동해 보세요! ✈️"
            placeholder="Search a nation"
            className="max-w-xs pb-3"
            >
            {nations.map((nation) => (
              <AutocompleteItem key={nation.value} value={nation.value} className="text-black">
                {nation.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="태그를 통해 재난 필터링">
          <div className="flex gap-3 flex-wrap">
            {disasters.map((disaster) => (
              <Button key={disaster.type} color="primary" size="sm" radius="full">
                {disaster.type}
              </Button>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="토글을 통해 끝나지 않은 재난 따로 확인">
          <div className="text-black">
            <Switch isSelected={isSelected} onValueChange={setIsSelected} defaultSelected size="lg">
              <p className="text-small">
              {isSelected ? (
                <span>실시간 재난 상황을 확인 중이에요 👀</span>
              ) : (
                <span>Click! 현재 진행 중인 재난 상황🚨</span>
              )}
              </p>
            </Switch>
          </div>
        </AccordionItem>
        <AccordionItem key="4" aria-label="Accordion 4" title="드래그 바를 통해 연도 별 흐름 확인">
          <div className="max-w-full p-3">
            <Slider 
              label="연도 별 재난 흐름 확인 🔮"
              size="sm"
              maxValue={2023}
              minValue={2000}
              getValue={(year) => `${year} / 2023`}
              className="max-w-md text-black"
            />
          </div>
        </AccordionItem>
      </Accordion>
      </div>
    </section>
  );
};

export default LeftSidebar;