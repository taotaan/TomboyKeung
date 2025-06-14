import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header className="header">
        <h1>Suranaree SecondHand</h1>
        
        <div className="nav-container">
          <nav className="nav-wrapper">
            <Link to="/">หน้าแรก</Link>
            <Link to="/products">สินค้าทั้งหมด</Link>
            <Link to="/exchange">แลกเปลี่ยน</Link>
            <Link to="/donate">บริจาค</Link>
          </nav>

          <div className="auth-links">
            <Link to="/login">เข้าสู่ระบบ</Link>
            <Link to="/register" className="register-btn">สมัคร</Link>
          </div>
        </div>
      </header>

     <main className="layout-container">
  <Outlet />
</main>

      <footer className="footer">
        © 2025 Suranaree SecondHand | พัฒนาโดยทีม Hackathon เมืองใหม่
      </footer>
    </>
  );
}
