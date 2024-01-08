"use client"

import '../globals.css'
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userLoginState } from '../recoil/dataRecoil';
import Cookies from 'js-cookie';
import axios from 'axios'

// 네비게이션 바
export const Navbar = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useRecoilState(userLoginState);

  // 🔄 토큰이 있으면 로그인 상태로 바꾸는 함수
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get('access-token');
      if (token) {
        try {
          const response = await axios.get('https://worldisaster.com/api/auth/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setLoginState({ isLoggedIn: true, userInfo: response.data });
          console.log('Log: Please provide login information', response);
        } catch (error) {
          console.error('Log: Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [setLoginState]);

  const handleLogin = async () => {
    try {
      const currentUrl = window.location.href;
      const encodedUrl = encodeURIComponent(currentUrl);
      const response = await axios.get(`https://worldisaster.com/api/auth/google/url?preLoginUrl=${encodedUrl}`);
      const { url } = response.data;
      window.location.href = url; // 받아온 URL로 리다이렉트
    } catch (error) {
      console.error('Log: Error fetching auth URL:', error);
    }
  };

  // 📌 로그아웃 클릭 시 get 요청
  const handleLogout = async () => {
    const token = Cookies.get('access-token');
    try {
      await axios.get('https://worldisaster.com/api/auth/logout/', {
        headers: {
          'Authorization': `Bearer ${token}` // 헤더에 토큰 추가
        }
      });
      setLoginState({ isLoggedIn: false, userInfo: null });
      alert('Log-out successful. Hope to see you again soon!');
    } catch (error) {
      console.error('Log: Logout failed:', error);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='flex items-center'>
          <Link href='/' className='flex items-center gap-3'>
            <Image src='logo.svg' alt='logo' width={30} height={30} />
            <p className='text-heading3-bold text-light-1 max-xs:hidden'>WorlDisaster</p>
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          {loginState.isLoggedIn ? (
            <>
              <span className='text-xl'><Link href="/support">Donate</Link></span>
              <span className='text-xl'><Link href="/mypage">My Page</Link></span>
              <span className='text-xl'>
                <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
              </span>
            </>
          ) : (
            <>
              {/* <span className='text-xl'><a onClick={handleLogin} style={{ cursor: 'pointer' }}>Login</a></span> */}
              <span className='text-xl'><a href="https://worldisaster.com/api/auth/google">Login</a></span>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;