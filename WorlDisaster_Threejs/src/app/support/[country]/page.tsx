"use client"

import LeftSidebar from "../../components/LeftSidebar";
import React from "react";
import Image from "next/image";
import {Card, CardBody, Modal} from "@nextui-org/react";
import {Input,Button} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { useState } from "react";

const Support = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePayment = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
      <>
      <NextUIProvider>
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container flex-1">
            <div className="flex w-full flex-col mx-auto p-2 max-w-4xl">
              <Card className="flex flex-row items-stretch">
                <CardBody>
                  <div className='w-full max-w-4xl my-5 p-3'>
                    <div className='flex flex-1 flex-col justify-start'>
                      <h3 className='text-heading4-medium'>Support</h3>
                      <div className='mt-7 flex w-[350px] flex-col gap-9'>
                        <p className='!text-base-regular text-light-3'>Add Card</p>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Input type="text"/>
                          <Input type="text"/>
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Input type="text" placeholder="Card number" />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <div className="flex flex-col">
                            <p className='!text-base-regular text-light-3 p-1 my-1'>Expiration Date</p>
                            <Input type="text" placeholder="MM/YY" />
                          </div>
                          <div className="flex flex-col">
                            <p className='!text-base-regular text-light-3 p-1 my-1'>CVV</p>
                            <Input type="text" placeholder="3-Digit" />
                          </div>
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Input type="text" placeholder="Billing Address" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-80 m-7" color="primary">Add Card</Button>
                </CardBody>
                <CardBody>
                  <div className='flex flex-1 flex-col justify-start'>
                    <Image
                      src="/신용카드.png"
                      width={300}
                      height={30}
                      alt={"Card"}/>
                    <div className="flex flex-col p-3">
                      <p className='text-heading4-medium p-1'>My Card</p>
                      <div className="flex flex-row justify-center items-center">
                        <Select 
                        label="Select the card" 
                        className="max-w-xs">
                        <SelectItem key={""}>
                          1234-5678-2468-3579
                        </SelectItem>
                      </Select>
                      <Button onClick={handlePayment} className="w-32 m-7" color="primary">To pay</Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>
        </main>
      </NextUIProvider>
      {isModalVisible && (
        <Modal onClose={closeModal}>
          <p>결제가 성공했습니다!</p>
          <Button onClick={closeModal}>닫기</Button>
        </Modal>
      )}
    </>
  );
};

export default Support;