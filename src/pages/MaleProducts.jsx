import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../Style/Products.css';

function MaleProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMaleProducts = async () => {
      const q = query(collection(db, 'products'), where('gender', '==', 'male'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchMaleProducts();
  }, []);

  return (
    <div className="products-page">
      <h2>👕 สินค้าสำหรับผู้ชาย</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrls?.[0]} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.price} บาท</p>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าสำหรับผู้ชายในขณะนี้</p>
        )}
      </div>
    </div>
  );
}

export default MaleProducts;
