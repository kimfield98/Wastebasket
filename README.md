- nodejs 설치! react 프로젝트도 시작
    
    ```tsx
    node -v
    // 설치 됐나 ???
    ```
    
    - 자바스크립트를 브라우저 밖에서도 동작할 수 있게 하는 런타임 환경이에요
    - npm 패키지매니저로 필요한 패키지들을 다 가져다 쓸 수 있어요
    - 프로젝트 폴더로 들어가서 code . 하면 vscode 열립니다요
    
    ```tsx
    npx create-react-app <폴더이름>
    ```
    
    - 이 명령어는 필요한 패키지까지 알아서 잘 만들어줘요!
    - 리액트 프로젝트에서 index.html은 단 하나에요 (SPA)
        - 안에 있는 내용만 바꿔줄거다- 자바스크립트가!
    - index.js 얘네가 연결고리 document.getElementById(’root’)로 딱 한 번 가져온다.
    - app이라는거 보여줄건데 이거 app.js 에서 왔네? ReactDOM.render가 연결해줘
    - `index.html - index.js - app.js` 가 이렇게 연결이 되어용
    
    ```tsx
    npm start
    // 시작해보자!
    ```
    
    - import로 파일들을 불러올 수 있어요 className 넣어줄 수 있고 뭐 .. 이거저거 알지요 쓰시면 됩니다요
    - jsx 하나로 묶어서 반환하는 것도 !!