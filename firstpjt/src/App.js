import React, { useState } from "react";


function App () {
  const [number, setNunber] = useState(0);
  return (
    <div>
      <div>{number}</div>
      <button onClick={()=>{setNunber(number+1)}}>+1</button>
      <button onClick={()=>{setNunber(number-1)}}>-1</button>
    </div>
  );
}

export default App;
