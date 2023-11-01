// src/App.js

import React from "react";

function Child(props) {
  return <div>{props.GrandFatherName}</div>
}

function Mother(props) {
  return <Child GrandFatherName={props.GrandFatherName} />
}

function GrandFather() {
  const name = "이범규";
  return <Mother GrandFatherName={name} />
}

function App () {
  return <GrandFather />
}

export default App;
