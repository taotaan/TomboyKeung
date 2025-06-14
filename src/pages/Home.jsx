import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../Style/Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // ดึงข้อมูลสินค้า 3 ตัวล่าสุด (เรียงตามวันที่สร้าง)
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
        <h1>♻️ เปลี่ยนเสื้อผ้าเก่าให้มีค่า</h1>
        <p>ลดขยะ สร้างรายได้ ร่วมสร้างเมืองใหม่สุรนารีให้น่าอยู่</p>
        <div className="btns">
          <Link to="/sell" className="sell">ลงขายสินค้า</Link>
          <Link to="/exchange" className="sell">แลกเปลี่ยนเสื้อผ้า</Link>
        </div>
      </div>

      {/* New Products (ดึงจาก Firebase) */}
      <section className="product-section">
        <h3>🆕 สินค้ามาใหม่</h3>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(item => (
              <div className="product-card" key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <div className="product-info">
                  <h4>{item.name}</h4>
                  <p>ราคา: {item.price} บาท</p>
                  {/* ตัวอย่างลิงก์ไปหน้ารายละเอียดสินค้า */}
                  <Link to={`/products/${item.id}`} className="detail-link">ดูรายละเอียด</Link>
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
