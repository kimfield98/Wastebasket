// src/App.js
import React from "react";
import Square from "./components/Square.js";
import "./App.css";

function App() {
  const users = [
    { id: 1, age: 30, name: "송중기" },
    { id: 2, age: 24, name: "송강" },
    { id: 3, age: 21, name: "김유정" },
    { id: 4, age: 29, name: "구교환" },
  ];

  return (
    <div className="app-style">
      {users.map((user) => {
        return <Square key={user.id}>
        <p>이름: {user.name}</p>
        <p>나이: {user.age}</p>
      </Square>
      ;
      })}
    </div>
  );
}

export default App;