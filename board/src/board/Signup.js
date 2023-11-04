import React, { useState } from 'react';
import '../App.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
      };
    
    return (
        <>
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
            <div>
            <label htmlFor="password">password</label>
            <input
                className="account"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="btncover">
                <button className="btn" type="submit">Signup</button>
            </div>
          </form>
        </div>
        </>
    )
}

export default Signup
