import React from "react";
import styled from "styled-components";

const StContainer = styled.div`
  display: flex;
`;

const StBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => props.borderColor};
  margin: 20px;
`;

// 박스의 색을 배열에 담기
const boxList = ["red", "green", "blue"];

// 색을 넣으면, 이름을 반환해주는 함수
const getBoxName = (color) => {
  switch (color) {
    case "red":
      return "빨간 박스";
    case "green":
      return "초록 박스";
    case "blue":
      return "파란 박스";
    default:
      return "검정 박스";
   }
};
const App = () => {
  return (
    <StContainer>
			{/* map을 이용해서 StBox를 반복하여 화면에 그립니다. */}
      {boxList.map((box) => (
        <StBox borderColor={box}>{getBoxName(box)}</StBox>
      ))}
    </StContainer>
  );
};

export default App;