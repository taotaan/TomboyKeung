import React from 'react';
import '../Style/ExchangeIntro.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function ExchangeIntro() {
  const navigate = useNavigate();

  return (
    <div className="exchange-container">
      <h1>แลกเปลี่ยนสินค้า</h1>
      <h2>
        <span className="text-red">QUICK.</span>{' '}
        <span className="text-green">EASY.</span>{' '}
        and <span className="text-blue">HAPPY.</span>
      </h2>
      <p className="subtitle">
        ของที่คุณไม่ใช้ อาจเป็นของที่คนอื่นกำลังมองหา
      </p>

      <div className="steps">
        <div className="step">
          <h1>1</h1>
          <h3>Post What You Want to Trade</h3>
          <p>อัปโหลดรูปสินค้า ใส่รายละเอียด เพื่อเริ่มการแลกเปลี่ยน</p>
        </div>
        <div className="step">
          <h1>2</h1>
          <h3>Find a Matching Item</h3>
          <p>ค้นหาสินค้าจากผู้ใช้อื่นที่คุณต้องการแลก</p>
        </div>
        <div className="step">
          <h1>3</h1>
          <h3>Exchange & Enjoy!</h3>
          <p>ตกลงแลกเปลี่ยน และรับสินค้าที่คุณต้องการอย่างง่ายดาย</p>
        </div>
      </div>

  <Link to="/addexchange" className="start-button">
  เริ่มกันเลย
</Link>
    </div>
  );
}
