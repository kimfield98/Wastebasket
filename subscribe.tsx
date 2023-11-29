import React, { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import nations from "../constants/nations";
import levels from "../constants/alertlevel";
import axios from "axios";
import '../globals.css';

const MAX_SELECTION = 3;

const Subscription = () => {
  const [isSubscribed, setisSubscribed] = useState(false);
  const [selectedNations, setSelectedNations] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const Subscription: React.FC = () => {

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://worldisaster.com/api/auth/subscribe');
          console.log('구독 정보 받아따 얍:', response.data); 
        } catch (error) {
          console.error('데이터 로드 실패', error);
        }
      };
  
      fetchData();
    }, [isSubscribed, selectedNations, selectedLevels]);

  const handleNationChange = (event) => {
    const selectedNation = event.target.value;

    if (selectedNation === 'all') {
      setSelectedNations(['all']);
    } else {
      if (selectedNations.includes('all')) {
        setSelectedNations([selectedNation]);
      } else {
        if (selectedNations.length < MAX_SELECTION) {
          setSelectedNations((prevSelected) => [...prevSelected, selectedNation]);
        } else {
          console.warn("최대 선택 가능한 국가 수를 초과했습니다.");
        }
      }
    }
  };

  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value;

    if (selectedLevel === 'all') {
      setSelectedLevels(['all']);
      // setSelectedNations([]);
    } else {
      if (selectedLevels.includes('all')) {
        setSelectedLevels([selectedLevel]);
      } else {
        if (selectedLevels.length < MAX_SELECTION) {
          setSelectedLevels((prevSelected) => [...prevSelected, selectedLevel]);
        } else {
          console.warn("최대 선택 가능한 규모 수를 초과했습니다.");
        }
      }
    }
  };

  const handleRemoveNation = (nation) => {
    setSelectedNations((prevSelected) => prevSelected.filter(item => item !== nation));
  };

  const handleRemoveLevel = (level) => {
    setSelectedLevels((prevSelected) => prevSelected.filter(item => item !== level));
  };

  useEffect(() => {
    // 'all'이 규모로 선택된 경우, 선택된 국가를 비웁니다.
    if (selectedLevels.includes('all')) {
      setSelectedNations([]);
    }
  }, [selectedLevels]);

  return (
    <div>
      <div className="main-title">메일 설정📮</div>
      <div className="content-box1">
        <div>
          <p className="content-title">모든 국가 재난 알림 및 이메일 발송</p>
          <p className="content-subtitle">새로 업데이트된 모든 재난 정보 알림을 받습니다.</p>
        </div>
        <div className="flex flex-row items-center">
          <Switch isSelected={isSubscribed} onValueChange={(value) => { console.log(value); setisSubscribed(value);}}></Switch>
          <p>{isSubscribed ? "ON" : "OFF"}</p>
        </div>
      </div>
      
      {!isSubscribed && (
        <div className="content-box2">
          <div>
            <div className="content-title">잠깐 ! 제가 원하는 정보만 받을게요 ✋</div>
            <div className="content-subtitle">새로 업데이트된 모든 재난 중 <span className="border">설정한</span> 재난 정보 알림만 받습니다.</div>
          </div>
          <div className="select-box">
            <div className="content-title">국가 선택</div>
              <form action="#">
                <select name="selectedNations" id="selectedNations" onChange={handleNationChange} value={selectedNations} multiple>
                  {nations.map((nation) => (
                    <option key={nation.value} value={nation.value}>
                      {nation.label}
                    </option>
                  ))}
                </select>
              </form>
              <div className="select-content">
                {selectedNations.map((nation) => (
                  <div key={nation} className="select-item" onClick={() => handleRemoveNation(nation)}>
                    <span>{nation} </span>
                    <span>x</span>
                  </div>
                ))}
              </div>
            
            <div className="content-title">규모 선택</div>
              <form action="#">
                <select name="selectedLevels" id="selectedLevels" onChange={handleLevelChange} value={selectedLevels} multiple>
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </form>
              <div className="select-content">
                {selectedLevels.map((level) => (
                  <div key={level} className="select-item" onClick={() => handleRemoveLevel(level)}>
                    <span>{level} </span>
                    <span>x</span>
                  </div>
                ))}
              </div>
              <button className="mybtn">설정 완료</button>
            </div>
        </div>
      )}
    </div>
  );
};
}

export default Subscription;