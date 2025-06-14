// src/pages/OrderStatus.jsx
import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../Style/OrderStatus.css';

export default function OrderStatus() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone) return;

    const q = query(collection(db, 'orders'), where('buyer.phone', '==', phone));
    const querySnapshot = await getDocs(q);

    const result = [];
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });

    setOrders(result);
  };

  return (
    <div className="order-status">
      <h2>ตรวจสอบสถานะการสั่งซื้อ</h2>
      <form onSubmit={handleSearch}>
        <label>กรอกเบอร์โทรที่ใช้สั่งซื้อ</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">ค้นหา</button>
      </form>

      {orders.length > 0 ? (
        <div className="order-list">
          <h3>ผลการค้นหา:</h3>
          {orders.map((order, idx) => (
            <div key={idx} className="order-card">
              <p><strong>รหัสสินค้า:</strong> {order.productId}</p>
              <p><strong>ชื่อ:</strong> {order.buyer.name}</p>
              <p><strong>สถานะ:</strong> {translateStatus(order.status)}</p>
            </div>
          ))}
        </div>
      ) : phone ? <p>ไม่พบคำสั่งซื้อ</p> : null}
    </div>
  );
}

function translateStatus(status) {
  switch (status) {
    case 'pending': return 'รอตรวจสอบสินค้า';
    case 'confirmed': return 'สินค้ามีพร้อมส่ง';
    case 'shipping': return 'กำลังจัดส่ง';
    case 'delivered': return 'จัดส่งสำเร็จ';
    case 'cancelled': return 'คำสั่งซื้อถูกยกเลิก';
    default: return status;
  }
}
