import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../Style/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null); // เพศที่เลือก (male หรือ female)

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("ไม่พบสินค้า");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} />
      <p>ราคา: {product.price} บาท</p>
      <p>รายละเอียด: {product.description}</p>

      <div className="gender-selection">
        <h3>เลือกเพศสำหรับการสวมใส่เสื้อผ้า</h3>
        <div className="gender-options">
          <div
            className={`gender-option ${selectedGender === 'male' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('male')}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setSelectedGender('male') }}
          >
            <img src="/images/M
            ale.png" alt="ชาย" />
            <p>ชาย</p>
          </div>

          <div
            className={`gender-option ${selectedGender === 'female' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('female')}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setSelectedGender('female') }}
          >
            <img src="/images/Female.png" alt="หญิง" />
            <p>หญิง</p>
          </div>
        </div>
        {selectedGender && <p>คุณเลือกเพศ: {selectedGender === 'male' ? 'ชาย' : 'หญิง'}</p>}
      </div>
    </div>
  );
}
