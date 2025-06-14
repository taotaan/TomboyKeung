import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../Style/Match.css';

// นำ tagOptions จาก Sell มาใช้ตรงนี้เลย
const tagOptions = [
  { value: 'street', label: 'สตรีท' },
  { value: 'vintage', label: 'วินเทจ' },
  { value: 'casual', label: 'ลำลอง' },
  { value: 'sport', label: 'ออกกำลังกาย' },
  { value: 'formal', label: 'ทางการ' },
  { value: 'korean', label: 'เกาหลี' },
  { value: 'japanese', label: 'ญี่ปุ่น' },
];

function Match() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [products, setProducts] = useState([]);

  // ดึงสินค้าจาก Firestore ตาม tag ที่เลือก (หรือทั้งหมดถ้าไม่เลือก)
  useEffect(() => {
    const fetchProducts = async () => {
      let q;
      if (selectedTag) {
        q = query(collection(db, 'products'), where('tags', 'array-contains', selectedTag));
      } else {
        q = collection(db, 'products');
      }

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchProducts();
  }, [selectedTag]);

  return (
    <div className="match-container">
      {/* ปุ่มแท็กแนวนอน */}
      <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setSelectedTag(null)}
          className={`tag-button ${selectedTag === null ? 'active' : ''}`}
        >
          ทั้งหมด
        </button>
        {tagOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSelectedTag(value)}
            className={`tag-button ${selectedTag === value ? 'active' : ''}`}
          >
            #{label}
          </button>
        ))}
      </div>

      {/* แสดงชื่อ tag ที่เลือก */}
      <h3>สินค้าที่ตรงกับสไตล์: {selectedTag ? tagOptions.find(t => t.value === selectedTag)?.label : 'ทั้งหมด'}</h3>

      {/* แสดงสินค้าด้านล่างเรียงแนวตั้ง */}
      <div className="product-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '8px' }}>
              <img
                src={product.imageUrls?.[0] || product.imageUrl}
                alt={product.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <h4>{product.name}</h4>
                <p>ราคา: {product.price} บาท</p>
              </div>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าในหมวดนี้</p>
        )}
      </div>
    </div>
  );
}

export default Match;
