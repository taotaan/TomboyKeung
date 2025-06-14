import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../Style/ProductDetail.css';
import '../Style/ExchangeDetail.css';

export default function ExchangeDetail() {
  const { id } = useParams();
  const [exchange, setExchange] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchExchange = async () => {
      const docRef = doc(db, 'exchange', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setExchange(data);
        if (data.imageUrl) {
          setMainImage(data.imageUrl);
        }
      } else {
        console.log("ไม่พบสินค้า");
      }
    };

    fetchExchange();
  }, [id]);

  if (!exchange) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{exchange.name}</h2>

      {mainImage && (
        <div className="product-images">
          <img className="main-image" src={mainImage} alt="main" />
        </div>
      )}

      <p>ราคา: {exchange.price} บาท</p>
      <p>รายละเอียด: {exchange.description}</p>
      <p>ขนาด: {exchange.size || 'ไม่ระบุ'}</p>

  <div className="button-group">
        <Link to={`/exchange/select/${id}`} className="exchange-button">
          แลกสินค้า
        </Link>
      <Link to="/chat" state={{ productId: id, ownerId: exchange.ownerId }}>
  💬 พูดคุยกับเจ้าของสินค้า
</Link>

      </div>
    </div>
  );
}

