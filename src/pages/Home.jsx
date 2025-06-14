import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Home.css';
import MaleImg from '../assets/Male.png';
import FemaleImg from '../assets/Female.png';
import Match from '../assets/find-your-match.png';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchProducts();
  }, []);

 

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="fixed-color-text">♻️ เปลี่ยนเสื้อผ้าเก่าให้มีค่า</h1>
        <p className="fixed-color-text">ลดขยะ สร้างรายได้ ร่วมสร้างเมืองใหม่สุรนารีให้น่าอยู่</p>
        <div className="btns">
          <Link to="/sell" className="sell">ลงขายสินค้า</Link>
          <Link to="/exchangeIntro" className="sell">โพสต์แลกเปลี่ยนเสื้อผ้า</Link>
       </div>
      </div>

      {/* New Products */}
      <section className="product-section">
        <h3>สินค้ามาใหม่!</h3>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(item => (
              <div className="product-card" key={item.id}>
                <img src={item.imageUrl || item.imageUrls?.[0]} alt={item.name} />
                <div className="product-info">
                  <h4>{item.name}</h4>
                  <p>ราคา: {item.price} บาท</p>
                  <Link to={`/products/${item.id}`} className="detail-link sell">
  ดูรายละเอียด
</Link>
                </div>
              </div>
            ))
          ) : (
            <p>กำลังโหลดสินค้าหรือยังไม่มีสินค้าใหม่...</p>
          )}
        </div>
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <Link to="/products" className="see-all-link">ดูสินค้าทั้งหมด &raquo;</Link>
        </div>
      </section>

<div className="gender-selection">
  <img 
   src={Match}
    alt="Find Your Match title"
    style={{ 
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto', 
      display: 'block'
    }}
  />

  <div className="gender-options">
    <div className="gender-option">
      <img src={MaleImg} alt="ชาย" />
      <p>ผู้ชาย</p>
    </div>
    <div className="gender-option">
     <img src={FemaleImg} alt="หญิง" />
      <p>ผู้หญิง</p>
    </div>
  </div>

  {/* 🔘 ปุ่มไปหน้า match */}
  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
    <button
      onClick={() => navigate('/match')}
      className="start-button sell"
      style={{ marginBottom: '20px' }}
    >
      Let’s START
    </button>
  </div>
</div>


      {/* Eco Section */}
      <section className="eco-section">
        <h3>🌱 เมืองใหม่สุรนารีใส่ใจสิ่งแวดล้อม</h3>
        <p>
          ร่วมมือกับชุมชนลดขยะเสื้อผ้า <br />
          และเปลี่ยนเสื้อผ้าเก่าให้กลายเป็นเชื้อเพลิงสะอาด หรือสินค้าใช้ต่อ
        </p>
      </section>
    </div>
  );
}

export default Home;