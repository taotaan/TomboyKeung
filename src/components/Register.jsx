// src/components/Register.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // import auth จากไฟล์ firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('สมัครสมาชิกสำเร็จ!');
      navigate('/login'); // กลับไปหน้า login หลังสมัครเสร็จ
    } catch (error) {
      alert('สมัครสมาชิกล้มเหลว: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>สมัครสมาชิก</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <label>อีเมล:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>รหัสผ่าน:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>ยืนยันรหัสผ่าน:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit">สมัครสมาชิก</button>
      </form>
      <p>มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link></p>
    </div>
  );
}

export default Register;
