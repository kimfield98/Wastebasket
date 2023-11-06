import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../board/Header';
import '../css/App.css';
import '../css/Reset.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('사용자 이름과 비밀번호를 모두 입력하세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인하세요.');
      return;
    }

    // 새로운 사용자를 users 배열에 추가
    setUsers([...users, { username, password }]);

    alert('회원가입 성공!');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    // 회원가입 성공 시 홈페이지로 이동
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="accountBox">
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              className="account"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='이름을 입력해주세요'
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
              placeholder='비밀번호를 입력해주세요'
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Password</label>
            <input
              className="account"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='다시 한 번 입력해주세요'
            />
          </div>
          <div className="btncover">
            <button className="btn" type="submit">Signup</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
