"use client"

import '../globals.css'
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userLoginState } from '../recoil/dataRecoil';
import Cookies from 'js-cookie';
import axios from 'axios'

// 네비게이션 바
export const Navbar = () => {
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
          console.log('로그인 정보 주세요',response);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [setLoginState]);


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
      alert('로그아웃 성공!');
    } catch (error) {
      console.error('Logout failed:', error);
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
              <span className='text-xl'><Link href="/support">후원</Link></span>
              <span className='text-xl'><Link href="/mypage">내 계정</Link></span>
              <span className='text-xl'>
                <a onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</a>
              </span>
            </>
          ) : (
            <>
              <span className='text-xl'><a href='https://worldisaster.com/api/auth/google/'>로그인</a></span>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar;