import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../Style/Products.css'; // ถ้ามี

function FemaleProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFemaleProducts = async () => {
      const q = query(collection(db, 'products'), where('gender', '==', 'female'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchFemaleProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>👗 สินค้าสำหรับผู้หญิง</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(item => (
            <div className="product-card" key={item.id}>
              <img src={item.imageUrls?.[0]} alt={item.name} />
              <div className="product-info">
                <h4>{item.name}</h4>
                <p>ราคา: {item.price} บาท</p>
              </div>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าสำหรับผู้หญิงในขณะนี้</p>
        )}
      </div>
    </div>
  );
}

export default FemaleProducts;