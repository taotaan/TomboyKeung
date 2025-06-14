import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import '../Style/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchData();
  }, []);

  return (
    
    <div className="layout-container">
      <div className="section">
        <h2>สินค้าใหม่</h2>
        <div className="products">
  {products.map((item) => (
    <Link to={`/products/${item.id}`} className="item" key={item.id}>
      <img src={item.imageUrl} alt={item.name} />
      <p>{item.name}<br />ราคา {item.price} บาท</p>
    </Link>
  ))}
</div>
      </div>
    </div>

  );
}
