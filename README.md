# 무엇을 만들어야 하는가?

- UI/UX를 고려한 게시판 (게시물 조회, 추가, 삭제 수정 기능)

# 무엇을 사용해야 하는가?

- 상태 관리 라이브러리 (ex. Redux)
  - Redux란?

# 무엇을 고려해야 하는가?

- 동적 라우팅

- 유효성 검증

# 추가 요구 사항

- 로그인, 회원가입 기능
- 1개 이상의 custom hook
- 버튼 컴포넌트 1개로 모든 버튼 구현 (모든 스타일과 기능 적용 가능한 만능 버튼)

---

# 리액트

- SPA 기반의 프론트엔드 개발 프레임워크
  - SPA란? Single Page Application, 한 개의 페이지로 이루어진 애플리케이션. 서버에 1회 리소스를 요청. 그 이후에는 필요할 때, 데이터만 받아와서 기존 페이지를 ‘수정’해주는 방식으로 화면을 수정 (자연스러운 UX). SEO(Search Engine Organization)에는 좋지 않음.
    - SEO(Search Engine Organization)란?

- 컴포넌트 단위의 독립적인 블록을 이용한 개발

# ES6 문법

- const(상수)
  - 재할당 X, 내부 속성 값 수정 가능, 블록 레벨 스코프
- let(변수)
  - 재할당 O, 블록 레벨 스코프

- object
  - key-value pair

  - 선언
  ```javascript
  const person = {
    name: '초원',
    age: 25
    doSomething: () => {},
  }

  ```

  - 생략 표현
    - key - value가 일치하면 생략
  ```javascript
  const name = '초원';
  const age = 25;

  // 변경 전
  const person = {
    name: name,
    age: age,
    company: 'jungle',
    doSomething: function(){},
  }

  // 변경 후
  const person = {
    name,
    age,
    company: 'jungle'
    doSomething: function(){},
  }
  ```
  
- 얕은 복사
  `const obj2 = obj1;` 이런 식의 복사 방법은 주의. 의도치 않은 변경이 일어날 수 있음

- Template Literals
  ```javascript
  // 일반 텍스트
  `string text`

  // 멀티라인
  `string text line 1
  string text line 2`

  // 플레이스 홀더를 이용한 표현식
  `string text ${expression} string text`
  ```

- Object Destructuring (구조분해 할당)
  ```javascript
  // 함수의 입력값 또한 각각 구조가 해제되어 각각 변수에 할당됨.
  // 특히 많이 쓰이는 패턴! 기억하자

  const person = {
    name: '초원',
    age: '25'
  }

  function hello({name, age}) {
    console.log(`${name}님, ${age}살이시네요!`);
    // 초원님, 25살이시네요!
  }

  hello(person);
  ```

- Array Destructuring (구조분해 할당)
  ```javascript
  const testArr = [1, 2, 3, 4, 5];
  const [val1, val2, val3, val4, val5] = testArr;

  console.log(val1); // 1
  ```

  - 추가 예제
  ```javascript
  let [name] = ["Tom", 10, "Seoul"];
  // let [, age] = ["Tom", 10, "Seoul"];
  // let [name, age, region] = ["Tom", 10, "Seoul"];
  // let [name, age, region, height] = ["Tom", 10, "Seoul"];
  // let [name, age, region, height = 150] = ["Tom", 10, "Seoul"];
  ```
- 전개 연산자(Spread Operator)
  - 어케 쓰는 거지

- Arrow Functions
  - 더 공부하기!
  ```javascript
  const mysum1 = (x, y) => x + y;
  const mysum2 = (x, y) => {x, y};
  const mysum3 = (x, y) => ({x: x, y: y}); const mysum4 = (x, y) => {
    return {x: x, y: y};
  }
  const mysum5 = function(x, y) {
    return {x: x, y: y};
  };
  function mysum6(x, y) {
    return {x: x, y: y};
  }
  ```

# 개발 환경 세팅

1. 웹 브라우저 - 크롬 브라우저 (설치 완료)
2. 에디터 - vscode (설치 완료)
3. git (설치 완료)
4. node (설치 완료)
5. npm이란? third-party 패키지란? 프론트엔드 의존성을 관리하기 위한 '패키지 매니저'
6. yarn으로 패키지 설치하는 방법
```bash
yarn add `[설치할 패키지 이름]`
```
7. npm과 yarn 공통점과 차이점
8. 자바스크립트 런타임 환경 - 브라우저, node

# CRA(create React App)
한 줄의 명령어 입력으로 React 프로젝트 개발에 필수요소를 자동으로 구성하는 방법

```
public > index.html
→ src > index.js
→ src > App.js
// 작업은 App.js에서!
```

- 상대경로 import -> 절대경로 지정하기 (이거 뭐 한거지??)
```
{
	"compilerOptions": {
		"baseUrl": "src"
	},
	"include": ["src"]
}
```

---

# React Component

함수형 컴포넌트(블럭)를 사용하자!
컴포넌트를 만든다는 것은 html을 return하는 함수를 만든다는 것
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
- 컴포넌트 첫 글자는 반드시 대문자로 만들 것
- 폴더는 소문자로 시작하는 카멜 케이스, 컴포넌트를 만드는 파일은 대문자로 시작하는 카멜 케이스로 이름 짓기
- 자식 컴포넌트를 만들어서 부모의 return 값으로 전달할 수 있음

- 렌더링 : 화면에 보여지게 하다
- JSX : 함수로 만들어진 컴포넌트를 html 태그 사용하듯이 코드를 작성하는 방식

# JSX
```js
// JavaScript를 확장한 문법
// JavaScript의 모든 기능이 포함되어 있으며, React Element를 생성하기 위한 문법
const element = <h1>Hello, world!</h1>;
```
- element: 단순히 화면에 그려지는 HTML적 요소

```js
// import [패키지명] from [경로] 이 형식으로 불러와요.
import React from 'react'; 
// js 파일 뿐 아니라 이미지도 가능가능!
import logo from './logo.svg';
// css? 가능!
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
- CSR 관점이 뭐지?
- 아무튼 리액트에서는 JSX 문법을 사용해서 React 요소를 만들고 DOM에 렌더링 시켜서 뷰 그리기
- 일반적인 html 태그는 js 파일안에서 사용 불가
- 따라서 JSX를 쓴다.
```js
const start_half = <div>
    <h1>안녕하세요!</h1>
    <p>시작이 반이다!</p>
  </div>;
```
- 리액트 DOM을 구성하는 건 리액트 요소, DOM을 구성하는 건 DOM 요소

- 실습
  - 태그는 꼭 닫아주기
  - 무조건 1개의 element 반환하기 (<div>로 감싸서)
  - 중괄호로 javascript값 가져오기
  - class 대신 className! id는 그냥 id
  - 인라인으로 style 주기
  ```js
  // 중괄호를 두 번 쓰는 이유? 객체도 자바스크립트니까요!
  // 이렇게 쓰거나,
  <p style={{color: 'orange', fontSize: '20px'}}>orange</p>

  //혹은 스타일 객체를 변수로 만들고 쓸 수 있어요!
  function App() {
    const styles = {
      color: 'orange',
      fontSize: '20px'
    };

    return (
      <div className="App">
        <p style={styles}>orange</p>
      </div>
    );
  }
  ```

# Props
컴포넌트 간의 정보 교류 방법 (부모 컴포넌트가 자식 컴포넌트에게 물려준 데이터들의 묶음)
- 반드시 위에서 아래 방향으로 흐름 (부모->자식, 단방향)
- 반드시 읽기 전용으로 취급, 변경X

```js
// src/App.js

import React from "react";

function App() {
  return <GrandFather />;
}

function GrandFather() {
  return <Mother />;
}

function Mother() {
	const name = '홍부인'; // 이름을 어떻게 전달하지???
  return <Child motherName={name} />; // props로 name을 전달했다!
}

function Child(props){
	console.log(props) // 이게 바로 props다. 받기 !!!
	return <div>연결 성공</div>
}


export default App;

```

- object literal : {key: “value”} 데이터 형태
- JSX에서도 { } 중괄호를 사용하면 자바스크립트 코드를 사용할 수 있음

- prop drilling
[부모] → [자식] → [그 자식] → [그 자식의 자식] 이 데이터를 받기 위해선 무려 3번이나 데이터를 내려줘야 하는데, 이와 같은 패턴을 피하기 위해 'Redux'와 같은 데이터 상태관리 툴을 사용함

```js
export default function App() {
  return (
    <div className="App">
      <FirstComponent content="Who needs me?" />
    </div>
  );
}

function FirstComponent({ content }) {
  return (
    <div>
      <h3>I am the first component</h3>;
      <SecondComponent content={content} />|
    </div>
  );
}

function SecondComponent({ content }) {
  return (
    <div>
      <h3>I am the second component</h3>;
      <ThirdComponent content={content} />
    </div>
  );
}

function ThirdComponent({ content }) {
  return (
    <div>
      <h3>I am the third component</h3>;
      <ComponentNeedingProps content={content} />
    </div>
  );
}

function ComponentNeedingProps({ content }) {
  return <h3>{content}</h3>;
}
```

---

# state
컴포넌트 내부에서 바뀔 수 있는 값 (UI 반영 위해)
- State를 만들 때는 useState()를 사용
- 기능이라고 하지 않고 hook이라고 표현
- 처음 값은 initial state라고 부름

```js
const [ value, setValue ] = useState( 초기값 )
```
- state를 변경할때는 setValue(바꾸고 싶은 값)를 사용
- setName을 통해서 바꾼 값은 어디에 저장되는 것이 아니기 때문에 단순히 화면에서만 바뀐 값으로 다시 렌더링 됨(새로고침하면 초기값으로)

- useState + onClick Event
- state 구현하고 이벤트 핸들러와 연결하기 등등 .. 더보기

- 불변성 : 메모리에 있는 값을 변경할 수 없는 것
  - 원시데이터 O
    - 각각 다른 변수가 1을 선언하면 이름은 다르지만 같은 메모리 값을 바라봄
    - 데이터 수정 시 새로운 메모리 공간에 수정된 값이 저장됨
  - 객체, 배열, 함수 X
    - 다른 메모리 공간에 새롭게 저장됨
    - 데이터 수정 시 기존에 저장되어 있던 메모리 공간의 값 자체를 바꿔버림

- 리액트에서 불변성이 중요한 이유?
원시 데이터가 아니어도 불변성을 지켜주는 것이 중요하다. 그 이유는 리액트는 화면 리렌더링 고민할 때 state 변화를 확인하는데, 그 방법이 메모리 주소를 비교하는 것이다. 직접 수정을 가해 값은 변했지만 메모리 주소가 변하지 않을 경우 마땅히 일어나야 할 리렌더링이 일어나지 않는다.

- 리액트 불변성 지키기 예시
배열을  setState 할 때 불변성을 지켜주기 위해, 직접 수정을 가하지 않고 전개 연산자를 사용해서 기존의 값을 복사하고, 그 이후에 값을 수정하는 식으로 구현 (spread operator(전개 연산자) 공부하기)

# 순수함수

같은 input 동일한 인자가 전달되면 항상 동일한 결과를 반환하는 코드 블록(함수). 하나 이상의 인자를 받고, 인자를 변경하지 않고, 참조하여 새로운 값을 반환

- 리액트 컴포넌트에서 state와 props가 같으면, 항상 같은 값을 반환해야 함
- 다른 side effect를 발생시키지 않아야 함 (HTTP 요청, 데이터 저장, 쿠키 조작 등)
- 컴포넌트의 상태값은 불변 객체로 관리해야만 함 (수정할 때는 기존 값 변경이 아니라, 같은 이름의 새로운 객체 생성)
- UI 개발의 복잡도를 낮추고, 버그 발생 확률도 줄일 수 있다! 테스트도 쉽다.