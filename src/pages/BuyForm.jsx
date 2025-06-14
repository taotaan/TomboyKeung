// src/pages/BuyForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import '../Style/BuyForm.css';

export default function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct(productSnap.data());
      } else {
        alert('ไม่พบสินค้า');
        navigate('/');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    await addDoc(collection(db, 'orders'), {
      productId: id,
      buyer: formData,
      status: 'pending',
      createdAt: new Date(),
    });

    alert('ส่งคำสั่งซื้อเรียบร้อย รอตรวจสอบสินค้า');
    navigate('/');
  };

  if (!product) return <div>กำลังโหลดข้อมูลสินค้า...</div>;

  return (
    <div className="buy-form">
      <h2>ซื้อสินค้า: {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>ชื่อผู้รับ</label>
        <input name="name" value={formData.name} onChange={handleChange} />

        <label>เบอร์โทร</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />

        <label>ที่อยู่</label>
        <textarea name="address" value={formData.address} onChange={handleChange} />

        <button type="submit">ยืนยันการสั่งซื้อ</button>
      </form>
    </div>
  );
}
