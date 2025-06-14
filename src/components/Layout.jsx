import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../firebase';  // สมมติมี firebase auth

export default function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ฟังสถานะการล็อกอินของ Firebase
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <header className="header">
  <img
    src="/images/SwishUp.png" // เปลี่ยน path ให้ตรงกับไฟล์โลโก้ที่คุณใส่ไว้ใน public folder
    alt="SwishUp Logo"
    className="logo"
  />

        <div className="nav-container">
          <nav className="nav-wrapper">
            <Link to="/">หน้าแรก</Link>
            <Link to="/products">สินค้าทั้งหมด</Link>
            <Link to="/exchange">แลกเปลี่ยน</Link>
            <Link to="/donate">บริจาค</Link>
            <Link to="/order-status">ตรวจสอบสถานะการสั่งซื้อ</Link>
          </nav>

          <div className="auth-links">
            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                <button
                  onClick={() => auth.signOut()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#50493C',
                    cursor: 'pointer',
                    marginLeft: '12px',
                    fontWeight: '600'
                  }}
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link to="/login">เข้าสู่ระบบ</Link>
                <Link to="/register" className="register-btn">สมัคร</Link>
              </>
            )}
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
