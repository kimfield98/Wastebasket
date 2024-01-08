"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NextUIProvider, Tabs, Tab, Card, CardBody, Accordion, AccordionItem } from "@nextui-org/react";
import { nations } from "../constants/nation";
import Cookies from "js-cookie";
import axios from "axios";
import "../globals.css";
import { set } from "video.js/dist/types/tech/middleware";

interface UserInfo {
  name: string;
  email: string;
  provider: string;
}

interface MypageProps { }

const Mypage: React.FC<MypageProps> = () => {

  const [loading, setLoading] = useState(false);

  const [userInfo, setuserInfo] = useState<UserInfo[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("access-token");
    const getuserInfo = async () => {
      try {
        const response = await axios.get<UserInfo>(
          "https://worldisaster.com/api/auth/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setuserInfo([response.data]);
        } else {
          setuserInfo([]);
        }
      } catch (error) {
        console.log("Log: Failed to retrieve UserInfo data:", error);
        setuserInfo([]);
      }
    };
    getuserInfo();
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await axios.get<UserInfo>("https://worldisaster.com/api/auth/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        console.log("Log: Successfully fetched subscription details:", response.data);
      } catch (error) {
        console.error("Log: Failed to fetch subscription details.", error);
      }
    };

    fetchData();
  }, []);


  const handleSaveSettings = async () => {
    const token = Cookies.get("access-token");

    try {
      setLoading(true); // 서버 응답 대기 중임을 나타내는 상태 업데이트

      const response = await axios.post("https://worldisaster.com/api/auth/info",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Log: Successfully saved the new subscription details:", response.data);
    } catch (error) {
      console.error("Log: Failed to save your new subscription details:", error);
    } finally {
      setLoading(false); // 서버 응답 대기가 끝났음을 나타내는 상태 업데이트
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('access-token');
        const res = await axios.get('https://worldisaster.com/api/support/history', {
          headers: {
            'Authorization': `Bearer ${token}`,
            withCredentials: true,
          }
        });
        console.log('Log: Successfully loaded your donation history:', res);
      } catch (error) {
        console.error('Log: Failed to load your donation history:', error);
      }
    };

    fetchData();
  }, []);

  ///////////////////////////////////  알림  ////////////////////////////////////////

  // 각 국가 선택 상태
  const [nation1, setNation1] = useState<string>("");
  const [nation2, setNation2] = useState<string>("");
  const [nation3, setNation3] = useState<string>("");

  // 선택된 국가를 다른 select 박스에서 disabled 시키는 함수
  const isDisabledOption = (optionValue: string) => {
    if (nation1 == "" && nation2 == "" && nation3 == "") {
      return;
    } else {
      return optionValue === nation1 || optionValue === nation2 || optionValue === nation3;
    }
  };

  // 첫 번째 선택에서 "world"를 선택하거나, 두 번째 또는 세 번째에서 "world" 선택 시 첫 번째를 "world"로 변경
  const handleNationChange = (selectedNation: string, position: string) => {
    if (selectedNation === "all") {

      setNation1("all");
      setNation2("");
      setNation3("");
    } else {
      if (position === 'nation1') {
        setNation1(selectedNation);
      } else if (position === 'nation2') {
        setNation2(selectedNation);
      } else if (position === 'nation3') {
        setNation3(selectedNation);
      }
    }
  };

  // 경보 레벨 상태 정의
  const [redAlert, setRedAlert] = useState<boolean>(false);
  const [orangeAlert, setOrangeAlert] = useState<boolean>(false);
  const [greenAlert, setGreenAlert] = useState<boolean>(false);

  // console.log(redAlert, orangeAlert, greenAlert); // 디버깅 목적으로 보여서 코멘트처리

  // 경보 레벨 상태 토글 함수
  const toggleRedAlert = () => setRedAlert(!redAlert);
  const toggleOrangeAlert = () => setOrangeAlert(!orangeAlert);
  const toggleGreenAlert = () => setGreenAlert(!greenAlert);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('access-token');
        const res = await axios.get('https://worldisaster.com/api/auth/info', {
          headers: {
            'Authorization': `Bearer ${token}`,
            withCredentials: true,
          }
        });
        const data = res.data;
        setNation1(data.nation1);
        setNation2(data.nation2);
        setNation3(data.nation3);
        data.redAlert === "true" ? setRedAlert(true) : setRedAlert(false);
        data.orangeAlert === "true" ? setOrangeAlert(true) : setOrangeAlert(false);
        data.greenAlert === "true" ? setGreenAlert(true) : setGreenAlert(false);
        console.log('Log: Sucessfully loaded your alert settings:', res);
      } catch (error) {
        console.error('Log: Failed to load your alert settings:', error);
      }
    };

    fetchData();
  }, [])

  // 저장 버튼 함수
  const handleSave = async () => {
    const isConfirmed = confirm("Would you like to save your new settings?");
    if (!isConfirmed) {
      return;
    }

    const token = Cookies.get("access-token");

    try {
      setLoading(true); // 서버 응답 대기 중임을 나타내는 상태 업데이트

      if ((redAlert || orangeAlert || greenAlert) && nation1 === "") {
        alert("Please select at least one country to continue.");
        return;
      }

      const response = await axios.post(
        "https://worldisaster.com/api/auth/info",
        {
          nation1,
          nation2,
          nation3,
          redAlert,
          orangeAlert,
          greenAlert,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Log: Settings saved successfully:", response.data);
      alert('저장 성공!');
    } catch (error) {
      console.error("Log: Failed to save your new settings:", error);
    } finally {
      console.log(nation1, nation2, nation3, redAlert, orangeAlert, greenAlert);
      setLoading(false); // 서버 응답 대기가 끝났음을 나타내는 상태 업데이트
    }
  };

  const handleWithdrawal = async () => {
    const isConfirmed = confirm("Are you sure you want to delete your account? We do more good with you on board.");
    if (!isConfirmed) {
      return;
    }

    const token = Cookies.get("access-token");

    try {
      setLoading(true);

      const response = await axios.post(
        "https://worldisaster.com/api/auth/delete",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Log: Successfully deleted your account:", response.data);
      // Check if there is a redirectUrl in the response
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl; // Redirect to the specified URL
      } else {
        alert('Your account was successfully deleted. We hope to win you back soon.'); // Change confirmation message
      }
    } catch (error) {
      console.error("Log: Failed to delete your account:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <NextUIProvider>
        <main className="flex flex-row">
          <section className="main-container flex-1">
            <div className="flex w-full flex-col mx-auto max-w-4xl">
              <Tabs aria-label="Options" className="w-full ">
                <Tab key="account" title="Account Settings">
                  <Card className="p-3">
                    <CardBody>
                      <Accordion>
                        <AccordionItem key="1" aria-label="Account Details" title="Account Details">
                          <div className="flex flex-col gap-2">
                            {userInfo.map((data, index) => (
                              <div key={index}>
                                <p className="my-3">👋 Hello {data.name}!</p>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Donation History" title="Donation History">
                          언제 어디에 얼마를 보냄
                          {/* 구현 필요 */}
                        </AccordionItem>

                        <AccordionItem key="withdrawal" aria-label="Account Delete" title="Delete Account">
                          <div className="flex items-center gap-5">
                            <p>Are you sure you want to opt-out of WorlDisasters? There is no going back.</p>
                            <button className="deleteBtn" onClick={handleWithdrawal} disabled={loading}>
                              Yes, I'd like to delete anyways.
                            </button>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="subscription" title="Subscription Settings">
                  <Card className="p-3">
                    <CardBody>
                      <div className="main-title w-min-[200px]">📮 Email subscription settings</div>
                      <div className="content-box2">
                        <div className="content-title">Choose at least one country (Max of 3).</div>
                        <div className="!grid !grid-rows-1 content-box2 md:!grid md:!grid-cols-3">
                          {/* 첫 번째 국가 선택 */}
                          <select
                            className="w-full"
                            name="nation1"
                            id="nation1"
                            onChange={(e) => handleNationChange(e.target.value, "nation1")}
                            value={nation1}
                          >
                            {nation1 === "" ?
                              <option value="">Please select country 1.</option> : null}
                            {nations.map((nation, idx) => (
                              <option
                                key={idx}
                                value={nation.value}
                                disabled={isDisabledOption(nation.value)}
                              >
                                {nation.label}
                              </option>
                            ))}
                          </select>

                          {/* 두 번째 국가 선택 */}
                          <select
                            className="w-full"
                            name="nation2"
                            id="nation2"
                            onChange={(e) => handleNationChange(e.target.value, "nation2")}
                            value={nation2}
                            hidden={nation1 === "" || nation1 === "all"}
                          >
                            {nation2 === "" ?
                              <option value="">Please select country 2.</option> : null}
                            {nations.map((nation, idx) => (
                              <option
                                key={idx}
                                value={nation.value}
                                disabled={isDisabledOption(nation.value)}
                              >
                                {nation.label}
                              </option>
                            ))}
                          </select>

                          {/* 세 번째 국가 선택 */}
                          <select
                            className="w-full"
                            name="nation3"
                            id="nation3"
                            onChange={(e) => handleNationChange(e.target.value, "nation3")}
                            value={nation3}
                            hidden={nation2 === "" || (nation1 === "all" && nation2 === "")}
                          >
                            {nation3 === "" ?
                              <option value="">Please select country 3.</option> : null}
                            {nations.map((nation, idx) => (
                              <option
                                key={idx}
                                value={nation.value}
                                disabled={isDisabledOption(nation.value)}
                              >
                                {nation.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="content-title">Disaster severity options (Toggle to subscribe to each severity level).</div>
                        <div className="content-box1 mx-6 !grid !grid-rows-1 md:!grid md:!grid-cols-3 !gap-0 justify-items-center">
                          <div className="bgc">
                            <label htmlFor="RED" className="content-box1 !pb-2">
                              <p>RED</p>
                              <button className="levelbtn" onClick={toggleRedAlert} style={{ backgroundColor: redAlert ? '#006FEE' : '', color: redAlert ? '#ffffff' : '' }}>
                                {redAlert ? "ON" : "OFF"}
                              </button>
                            </label>
                          </div>
                          <label htmlFor="ORANGE" className="content-box1 !pb-2">
                            <p>ORANGE</p>
                            <button className="levelbtn" onClick={toggleOrangeAlert} style={{ backgroundColor: orangeAlert ? '#006FEE' : '', color: orangeAlert ? '#ffffff' : '' }}>
                              {orangeAlert ? "ON" : "OFF"}
                            </button>
                          </label>
                          <label htmlFor="GREEN" className="content-box1 !pb-2">
                            <p>GREEN</p>
                            <button className="levelbtn" onClick={toggleGreenAlert} style={{ backgroundColor: greenAlert ? '#006FEE' : '', color: greenAlert ? '#ffffff' : '' }}>
                              {greenAlert ? "ON" : "OFF"}
                            </button>
                          </label>
                        </div>
                      </div>
                      <div className="button-box">
                        <button className="saveBtn" onClick={handleSave} disabled={loading}>Update Settings</button>
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

export default Mypage;