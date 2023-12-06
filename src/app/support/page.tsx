"use client"

import React, { useEffect, useState } from "react";
import { NextUIProvider, Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import Cookies from 'js-cookie';
import "../globals.css";
import { dataState, DataType } from "../recoil/dataRecoil";
import { useRecoilState } from "recoil";

interface Disaster {
  objectId: number;
  dID: string;
  dSource: string;
  dStatus: string;
  dAlertLevel: string;
  dTitle: string;
}

const Support: React.FC = () => {
  const [data,setdata] = useRecoilState(dataState);
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [selecteddID, setSelecteddID] = useState<string>("");
  const [amount, setAmount] = useState<string>('0');
  const [currency, setCurrency] = useState<string>("USD");
  const [supportDetail, setSupportDetail] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('access-token');
        const res = await axios.get('https://worldisaster.com/api/support', {
          headers: {
            'Authorization': `Bearer ${token}`,
            withCredentials: true,
          }
        });
        console.log('후원 리스트 데이터 로드 성공', res);
        setDisasters(res.data);
      } catch (error) {
        console.error('데이터 로드 실패', error);
      }
    };

    fetchData();
  }, []);

  const token = Cookies.get('access-token');

    const handleButtonClick = async () => {

      console.log("Before axios request - selecteddID:", selecteddID);
      console.log("Before axios request - amount:", amount);
      console.log("Before axios request - currency:", currency);

      try {
        const response = await axios.post('https://worldisaster.com/api/support/paypal',
          {
            dID: selecteddID,
            amount,
            currency,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
              withCredentials: true, // 쿠키와 인증 정보를 포함
            },
          }
        );
        console.log('후원 요청 버튼 클릭',response);
        const approvalUrl = response.data.approvalUrl;
        console.log(approvalUrl);

        if (approvalUrl) {
            window.location.href = approvalUrl;
        } else {
            console.error('Approval URL is undefined!');
        }

      } catch (error) {
          console.error('Error: ', error);
      }
    };

    useEffect(() => {
      if (data.length === 0) {
        const loadData = async () => {
          try {
            const [oldData, newData] = await Promise.all([
              axios.get('https://worldisaster.com/api/oldDisasters'),
              axios.get('https://worldisaster.com/api/newDisasters'),
            ]);
            setdata(oldData.data.concat(newData.data));
          } catch (err) {
            console.log('데이터 로드 실패', err);
          }
        };
        loadData();
      } else {
        const selectedDisaster = data.find((disaster) => disaster.dID === selecteddID);
        if (selectedDisaster) {
          setSupportDetail(selectedDisaster);
        } else {
          setSupportDetail(null);
        }
      }
    },[selecteddID]);

    return (
      <>
        <NextUIProvider>
          <main className="flex flex-row justify-center items-center h-screen">
            <section className="main-container">
              <div className="flex w-full flex-col mx-auto max-w-4xl">
                <Card className="flex flex-row p-6">

                  <CardBody className="w-full mx-auto py-3 gap-5 max-w-md h-96 bg-sky-100 rounded-lg shadow-md">
                    <div>
                    {!supportDetail ? 
                        <div className="text-center">
                          후원 목록을 선택 후 상세 정보 확인
                        </div>
                        :
                        <>
                          <div>
                            Title: {supportDetail.dTitle}
                            {supportDetail.dAlertLevel}
                            {supportDetail.dStatus}
                          </div>
                        </>
                    }
                    </div>
                  </CardBody>

                  <CardBody className="py-3 gap-7">

                    <div className="flex flex-col gap-3">
                      
                      <select 
                        name="재난 선택"
                        placeholder="현재 진행 중인 재난 확인하기" 
                        id="1" 
                        value={selecteddID}
                        onChange={(event) => setSelecteddID(event.target.value)}
                      >
                        {selecteddID === "" ? <option>재난을 선택해주세요</option> : null}
                        {disasters.map((disaster,index) => (
                          <option 
                            key={index}
                            value={disaster.dID} 
                          >
                            {disaster.dTitle}
                          </option>
                        ))}
                      </select>

                      <select
                        aria-label="통화 선택"
                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                        id="currency"
                        name="currency"
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                      >
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                      <input type="text" name="amount" id="amount" placeholder="0.00" onChange={(event) => setAmount(event.target.value)} />
                    </div>
                    
                    
                    <div className="button-box">
                      <button className="saveBtn" onClick={handleButtonClick}>후원하기</button>
                    </div>

                  </CardBody>

                </Card>
              </div>
            </section>
          </main>
        </NextUIProvider>
      </>
  );
};

export default Support;