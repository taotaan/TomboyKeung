// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Home.css';                       

function Home() {
  return (
    <div className="home-container">
      {/* Header */}
<header className="header">
  <h1>Suranaree SecondHand</h1>
  <div className="nav-wrapper">
    <nav>
            <Link to="/">หน้าแรก</Link>
            <Link to="/products">สินค้าทั้งหมด</Link>
            <Link to="/exchange">แลกเปลี่ยน</Link>
            <Link to="/donate">บริจาค</Link>

    </nav>
  </div>
</header>


 <div className="hero">
  <h1>♻️ เปลี่ยนเสื้อผ้าเก่าให้มีค่า</h1>
  <p>ลดขยะ สร้างรายได้ ร่วมสร้างเมืองใหม่สุรนารีให้น่าอยู่</p>
  <div className="btns">
    <button className="sell">ลงขายสินค้า</button>
    <button className="sell">แลกเปลี่ยนเสื้อผ้า</button>
  </div>
</div>


      {/* New Products */}
      <section className="product-section">
        <h3>🆕 สินค้ามาใหม่</h3>
        <div className="product-grid">
          {[1, 2, 3].map((item) => (
            <div className="product-card" key={item}>
              <img src={`https://via.placeholder.com/300x200?text=สินค้า+${item}`} alt="สินค้า" />
              <div className="product-info">
                <h4>เสื้อผ้าเบอร์ {item}</h4>
                <p>ราคา: 100 บาท</p>
                <a href="#">ดูรายละเอียด</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Eco Section */}
      <section className="eco-section">
        <h3>🌱 เมืองใหม่สุรนารีใส่ใจสิ่งแวดล้อม</h3>
        <p>
          ร่วมมือกับชุมชนลดขยะเสื้อผ้า <br />
          และเปลี่ยนเสื้อผ้าเก่าให้กลายเป็นเชื้อเพลิงสะอาด หรือสินค้าใช้ต่อ
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 Suranaree SecondHand | พัฒนาโดยทีม Hackathon เมืองใหม่
      </footer>
    </div >
  );
}

export default Home;
