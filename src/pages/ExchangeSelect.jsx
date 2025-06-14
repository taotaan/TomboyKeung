import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function ExchangeSelect() {
  const { id: targetItemId } = useParams(); // ไอเท็มของคนอื่นที่เราจะแลก
  const [myItems, setMyItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyItems = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('กรุณาเข้าสู่ระบบก่อน');
        navigate('/login');
        return;
      }

      // ดึงจาก exchange แทน myitems
      const q = query(
        collection(db, 'exchange'),
        where('userId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyItems(data);
    };

    fetchMyItems();
  }, [navigate]);

  const handleSubmit = () => {
    if (!selectedId) return;
    navigate('/exchange/confirm', {
      state: {
        myItemId: selectedId,
        targetItemId,
      }
    });
  };

  return (
    <div className="exchange-select">
      <h2>เลือกสินค้าของคุณเพื่อแลกเปลี่ยน</h2>
      <div className="exchange-list">
        {myItems.length === 0 && <p>ยังไม่มีรายการสินค้าของคุณ</p>}
        {myItems.map(item => (
          <div
            key={item.id}
            className={`exchange-item ${selectedId === item.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(item.id)}
            style={{
              border: selectedId === item.id ? '2px solid #ff6600' : '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '200px' }} />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedId}
        style={{ marginTop: '20px' }}
      >
        ถัดไป
      </button>
    </div>
  );
}
