// src/modules/counter.js

const PLUS_ONE = "PLUS_ONE";
const MINUS_ONE = "MINUS_ONE";

export const plusOne = () => {
  return {
    type: PLUS_ONE,
  }
}

export const minusOne = () => {
  return {
    type: MINUS_ONE,
  };
};

// 초기 상태값
const initialState = {
  username: "김초원",
  password: 1234,
  number: 0,
};

// 리듀서
const counter = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "PLUS_ONE":
      return {
        number: state.number+1,
      };
    case "MINUS_ONE":
      return {
        number: state.number-1,
      };
    default:
      return state;
  }
};


// 모듈파일에서는 리듀서를 export default 한다.
export default counter;