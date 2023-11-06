import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../board/Header';
import '../css/App.css';
import '../css/Reset.css';
 
function Signin(){
  // const users = [
  //   {username: "김초원",password:"1234"},
  //   {username: "장호영",password:"5678"},
  // ]

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
  
    // 입력된 username와 password를 서버에 전송
    try {
      const response = await axios.post('/REACT_APP_API_URL', {
        email: username, // 이메일 대신 username 사용
        password: password
      });
  
      if (response.data.loginSuccess) {
        // 로그인 성공 후에 원하는 동작 수행
        navigate('/');
      } else {
        alert(response.data.message); // 서버로부터의 에러 메시지 표시
      }
    } catch (error) {
      alert('서버 오류. 다시 시도하십시오.');
      console.error(error);
    }
  };
  
  
  return (
      <>
      <Header />
      <div className="accountBox">
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="username">Username</label>
          <input
              className="account"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="password">Password</label>
          <input
              className="account"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className="btncover">
              <button className="btn" type="submit">Login</button>
              <button className="btn" type="submit"><Link to="/signup">Signup</Link></button>
          </div>
        </form>
      </div>
      </>
  );
}
export default Signin;