import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../Style/ExchangeConfirm.css';

export default function ExchangeConfirm() {
  const { state } = useLocation();
  const { myItemId, targetItemId } = state || {};

  const [myItem, setMyItem] = useState(null);
  const [targetItem, setTargetItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!myItemId || !targetItemId) return;

      const myDoc = await getDoc(doc(db, 'exchange', myItemId));
      const targetDoc = await getDoc(doc(db, 'products', targetItemId));

      if (myDoc.exists()) setMyItem({ id: myDoc.id, ...myDoc.data() });
      if (targetDoc.exists()) setTargetItem({ id: targetDoc.id, ...targetDoc.data() });
    };

    fetchItems();
  }, [myItemId, targetItemId]);

  const handleConfirm = () => {
    alert(`คุณยืนยันการแลก "${myItem?.name}" กับ "${targetItem?.name}"`);
    // TODO: บันทึกข้อมูลลง Firestore หรือส่ง notification
  };

  if (!myItem || !targetItem) return <div className="loading">⏳ กำลังโหลดข้อมูล...</div>;

  return (
    <div className="exchange-confirm">
      <h2>ยืนยันการแลกสินค้า</h2>

      <div className="item-row">
        {/* สินค้าของคุณ */}
        <div className="item-box">
          <h4>🎒 สินค้าของคุณ</h4>
          <img src={myItem.imageUrl} alt={myItem.name} />
          <p title={myItem.name}>{myItem.name}</p>
        </div>

        <div className="arrow">🔁</div>

        {/* สินค้าที่คุณต้องการ */}
        <div className="item-box">
          <h4>🎯 สินค้าที่คุณต้องการ</h4>
          <img src={targetItem.imageUrls?.[0]} alt={targetItem.name} />
          <p title={targetItem.name}>{targetItem.name}</p>
        </div>
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        ✅ ยืนยันการแลกเปลี่ยน
      </button>
    </div>
  );
}
