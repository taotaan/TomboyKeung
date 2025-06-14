import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../Style/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct(data);
        if (data.imageUrls && data.imageUrls.length > 0) {
          setMainImage(data.imageUrls[0]); // รูปหลักเริ่มต้น
        }
      } else {
        console.log("ไม่พบสินค้า");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  const handleBuyClick = () => {
    if (!auth.currentUser) {
      alert('กรุณาเข้าสู่ระบบก่อนซื้อสินค้า');
      navigate('/login');
    } else {
      navigate(`/buy/${id}`);
    }
  };

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>

      {mainImage && (
        <div className="product-images">
          <img className="main-image" src={mainImage} alt="main" />
          <div className="thumbnail-row">
            {product.imageUrls?.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`thumbnail-${idx}`}
                className={`thumbnail ${mainImage === url ? 'active' : ''}`}
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>
        </div>
      )}

      <p>ราคา: {product.price} บาท</p>
      <p>รายละเอียด: {product.description}</p>
      <p>ขนาด: {product.size || 'ไม่ระบุ'}</p>

      <div className="button-group">
  <button className="action-button" onClick={handleBuyClick}>
    ซื้อสินค้า
  </button>

  <Link to={`/exchange/select/${id}`} className="action-button">
    แลกสินค้า
  </Link>
</div>

    </div>
  );
}
