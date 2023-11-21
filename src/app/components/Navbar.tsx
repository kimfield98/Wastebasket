"use client"

import '../globals.css'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


export const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('access-token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <nav className='topbar'>
        <div className='flex items-center gap-5'>
          <Link href='/' className='flex items-center gap-4'>
            <Image src='/logo.svg' alt='logo' width={28} height={28} />
            <p className='text-heading3-bold text-light-1 max-xs:hidden'>WorlDisaster</p>
          </Link>
          <div className='flex items-center gap-3'>
            <div className='text-xl'><Link href='/archive'>아카이브</Link></div>
            <div className='text-xl'><Link href='/live'>실시간</Link></div>
            {/* <div className='text-xl'>언어</div> */}
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {isLoggedIn ? (
            <>
              <span className='text-xl'><Link href="/mypage">내 계정</Link></span>
              <span className='text-xl'><a href='https://worldisaster.com/api/auth/logout'>로그아웃</a></span>
            </>
          ) : (
            <>
              <span className='text-xl'><a href='https://worldisaster.com/api/auth/google'>로그인</a></span>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar;