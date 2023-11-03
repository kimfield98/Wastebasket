import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>게시물 조회, 추가, 수정, 삭제 기능 구현하기 ⭕</div>
      <div>Redux 활용하기</div>
      <div>동적라우팅</div>
      <div>유효성 검증(alert 알림) ❌</div>
      <div>console.log 보이지 않도록 처리 ❌</div>
      <div>로그인, 회원가입 기능 구현하기 ❌</div>
      <div>1개 이상의 custom hook</div>
      <div>만능버튼 만들기 ⭕</div>
      <button class="btn"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 이동
      </button>
    </div>
    
  );
}

export default Main;