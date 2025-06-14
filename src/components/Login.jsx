// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // import auth จากไฟล์ firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../Style/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('เข้าสู่ระบบสำเร็จ!');
      navigate('/');  // กลับหน้า home หลัง login สำเร็จ
    } catch (error) {
      alert('เข้าสู่ระบบล้มเหลว: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <label>อีเมล:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>รหัสผ่าน:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">เข้าสู่ระบบ</button>
      </form>
      <p>ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิกที่นี่</Link></p>
    </div>
  );
}

export default Login;