import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import '../Style/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [likedItems, setLikedItems] = useState({}); // เก็บสถานะถูกใจของแต่ละสินค้า

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchData();
  }, []);

  // ฟังก์ชันกดถูกใจ (toggle)
  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="layout-container">
      <div className="section">
        <h2>สินค้าใหม่</h2>
        <div className="products">
          {products.map((item) => (
  <div className="item" key={item.id}>

    <Link to={`/products/${item.id}`}>
      {/* แสดงรูปแรกจาก imageUrls */}
      <img src={item.imageUrls?.[0] || ''} alt={item.name} />
    </Link>

    <button
      className={`like-button ${likedItems[item.id] ? 'liked' : ''}`}
      onClick={() => toggleLike(item.id)}
      aria-pressed={likedItems[item.id] || false}
      title={likedItems[item.id] ? 'ยกเลิกถูกใจ' : 'ถูกใจ'}
    >
      {likedItems[item.id] ? '❤️' : '♡'}
    </button>

    <Link to={`/products/${item.id}`}>
      <p>{item.name}<br />ราคา {item.price} บาท</p>
    </Link>
  </div>
))}

        </div>
      </div>
    </div>
  );
}