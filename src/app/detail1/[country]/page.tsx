"use client"

import DisastersFilter from "@/app/components/DisastersFilter";
import CountryInfo from "@/app/components/CountryInfo";
import LeftSidebar from "../../components/LeftSidebar";
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

import {NextUIProvider} from "@nextui-org/react";

const Nation = () => {

  return (
      <>
      <NextUIProvider>
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container flex-1">
            <div className="flex w-full flex-col mx-auto p-2 max-w-4xl">
              <Tabs aria-label="Options" className="w-full ">
                <Tab key="nation" title="Nation">
                  <Card className="p-3">
                    <CardBody>
                    <CountryInfo />
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="disaster" title="Disaster">
                  <Card className="flex items-stretch">
                    <CardBody>
                      <div className='w-full max-w-4xl my-5 p-3'>
                        <div className='flex flex-1 flex-col justify-start'>
                          <h3 className='text-heading4-medium'>Disaster Detailed Information</h3>
                          <div className='mt-7 flex w-[350px] flex-col gap-9'>
                            {/* <p className='!text-base-regular text-light-3'>No data yet</p> */}
                          </div>
                            <DisastersFilter />
                        </div>
                      </div>
                    </CardBody>
                  </Card>  
                </Tab>
              </Tabs>
            </div>
          </section>
        </main>
      </NextUIProvider>
    </>
  );
};

export default Nation;