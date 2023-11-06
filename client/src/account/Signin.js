import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../board/Header';
import '../css/App.css';
import '../css/Reset.css';
 
function Signin(){
  const users = [
    {username: "김초원",password:"1234"},
    {username: "장호영",password:"5678"},
  ]

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault(); // 폼 제출 기본 동작 방지

      // 입력된 username과 password를 검사
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
          alert('로그인 성공!');
          navigate('/');
      } else {
          alert('로그인 실패. 올바른 사용자 이름과 비밀번호를 입력하세요.');
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