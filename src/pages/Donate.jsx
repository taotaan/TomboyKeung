import React from 'react';
import '../Style/Donate.css';
import { useNavigate } from 'react-router-dom';

export default function Donate() {
  const navigate = useNavigate();

  return (
    <div className="donate-container">
      <h1>บริจาคสินค้า</h1>
      <h2>
        <span className="text-red">QUICK.</span>{' '}
        <span className="text-green">EASY.</span>{' '}
        and <span className="text-blue">HAPPY.</span>
      </h2>
      <p className="subtitle">
        ของที่คุณเบื่อ อาจเป็นของที่หลายคนกำลังต้องการ
      </p>

      <div className="steps">
        <div className="step">
          <h1>1</h1>
          <h3>Post What You No Longer Use</h3>
          <p>อัปโหลดรูป ใส่รายละเอียด พร้อมระบุจุดที่ต้องการบริจาค</p>
        </div>
        <div className="step">
          <h1>2</h1>
          <h3>Match & Trade with the Right Person</h3>
          <p>ไม่ต้องรอ บริจาคของง่ายให้ถึงตัวคุณ</p>
        </div>
        <div className="step">
          <h1>3</h1>
          <h3>Swap & Enjoy Something New!</h3>
          <p>บันทึกภาพพร้อมบริจาค พร้อมรับแต้มและสนับสนุน</p>
        </div>
      </div>

      <button className="start-button" onClick={() => navigate('/donate/form')}>
        เริ่มเลย
      </button>
    </div>
  );
}
