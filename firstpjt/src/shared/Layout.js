import React from 'react';
import '../App.css';

function Header() {
  return (
    <div class="headerstyles">
      <span>짜잔. 초원이의 리액트 게시판</span>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div class="layoutstyles">
        {children}
      </div>
    </div>
  );
}

export default Layout;