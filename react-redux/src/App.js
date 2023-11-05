// src/App.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  // const counterStore = useSelector((state) => state);
  // console.log(counterStore);
  // const number = useSelector(state => state.counter.number); // 0
  const dispatch = useDispatch();
  const number = useSelector((state) => state.counter.number)
  console.log(number);

  return (
  <div>
    {number}
    <button onClick={() => {
      dispatch({ type:"PLUS_ONE" })
    }}>
      +1
    </button>
    <button onClick={() => {
      dispatch({ type: "MINUS_ONE" })
    }}>
      -1
    </button>
  </div>
  );
}

export default App;