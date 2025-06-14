import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Style/Sell.css';

function Sell() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `products/${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'products'), {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        imageUrl: imageUrl,
        createdAt: Timestamp.now(),
      });

      alert('✅ ลงขายสำเร็จ!');
      setFormData({ name: '', price: '', description: '', category: '', image: null });
    } catch (err) {
      console.error(err);
      alert('❌ เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="sell-container">
      <h2>🛍️ ลงขายสินค้า</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        <label>ชื่อสินค้า:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>ราคา (บาท):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>รายละเอียดสินค้า:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <label>หมวดหมู่สินค้า:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">-- เลือกหมวดหมู่ --</option>
          <option value="shirt">เสื้อ</option>
          <option value="trousers">กางเกง</option>
          <option value="hat">หมวก</option>
          <option value="shoe">รองเท้า</option>
        </select>

        <label>รูปภาพ:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        <button type="submit">ลงขาย</button>
      </form>
    </div>
  );
}

export default Sell;
