import React from 'react';

export default function Products() {
  return (
    <div className="section">
      <h2>สินค้าใหม่</h2>
      <div className="products">
        <div className="item">
          <img src="https://via.placeholder.com/150" alt="สินค้า" />
          <p>เสื้อเบอร์ 1<br />ราคา 100 บาท</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/150" alt="สินค้า" />
          <p>เสื้อเบอร์ 2<br />ราคา 100 บาท</p>
        </div>
      </div>
    </div>
  );
}