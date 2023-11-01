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
