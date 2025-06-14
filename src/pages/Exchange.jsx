// src/pages/Exchange.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../Style/Exchange.css'; // สไตล์แยกไว้ชัดเจน

export default function Exchange() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, 'exchange'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
      <div className="exchange-list">
        {items.map(item => (
          <div key={item.id} className="exchange-card">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="exchange-img" />
            )}
            <div className="exchange-info">
              <strong>{item.name}</strong><br />
              {item.description}<br />

               <Link to={`/exchange/${item.id}`} className="detail-link">ดูรายละเอียด</Link>
            </div>
          </div>
        ))}
      </div>
  );
}
