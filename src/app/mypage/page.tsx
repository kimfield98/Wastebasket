import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, link} from "@nextui-org/react";

export default function Mypage() {
  return (
    <>
      <main className='flex flex-row'>
        <section className='main-container'>
          <Card className="max-w-4xl">
            <CardHeader className="flex gap-3">
              <Image
                src={"고슴도치.jpg"}
                alt="profile img"
                height={40}
                width={40}
                radius="sm"
              />
              <div className="flex flex-col">
                <p className="text-md">김호집</p>
                <p className="text-small text-default-500">rlaghwlq12@gmail.com</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <p>반갑습니다. 어서오세요!</p>
            </CardBody>
            <Divider/>
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="/"
              >
                내가 심은 나무 확인하기
              </Link>
            </CardFooter>
          </Card>
        </section>
      </main>
      </>
    )
  };