import React from 'react';

function Child() {
  return <div>연결 성공</div>;
}

function Mother() {
  return <Child/>;
}

function GrandFather() {
  return <Mother/>;
}

function App() {
  return <GrandFather/>;
}

export default App;