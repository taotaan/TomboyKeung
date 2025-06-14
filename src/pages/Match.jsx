import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../Style/Match.css';

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
  const [height, setHeight] = useState(170); // ส่วนสูงเริ่มต้น
  const [weight, setWeight] = useState(60);  // น้ำหนักเริ่มต้น

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
    <div className="match-wrapper">
      <div className="match-container">

        {/* เมนูด้านบน */}
        <div className="menu-bar">
          <button className="menu-button">ไซส์</button>
          <button className="menu-button">หมวดหมู่</button>
          <button className="menu-button">สไตล์</button>
        </div>

        {/* ปุ่มแท็ก */}
        <div className="tag-list">
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

        <h3>
          สินค้าที่ตรงกับสไตล์:{' '}
          {selectedTag
            ? tagOptions.find((t) => t.value === selectedTag)?.label
            : 'ทั้งหมด'}
        </h3>

        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={product.imageUrls?.[0] || product.imageUrl}
                  alt={product.name}
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

      <div className="side-image">
        <img src="/images/Male.png" alt="ชายผู้ชาย" />

        {/* สไลด์ด้านล่างรูป */}
        <div className="slider-filters">
          <div className="slider-group">
            <label htmlFor="heightSlider">ส่วนสูง: {height} ซม.</label>
            <input
              type="range"
              id="heightSlider"
              min="140"
              max="200"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="slider-group">
            <label htmlFor="weightSlider">น้ำหนัก: {weight} กก.</label>
            <input
              type="range"
              id="weightSlider"
              min="40"
              max="120"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          {/* ปุ่ม Submit */}
    <button className="submit-button" onClick={() => alert(`ส่วนสูง: ${height} ซม.\nน้ำหนัก: ${weight} กก.`)}>
      ยืนยันข้อมูล
    </button>
        </div>
      </div>
    </div>
  );
}

export default Match;
