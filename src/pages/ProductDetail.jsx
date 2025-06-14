import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../Style/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fitResult, setFitResult] = useState('');
  const [mainImage, setMainImage] = useState(null);

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

  const checkFit = () => {
    const h = parseInt(height);
    const w = parseInt(weight);

    if (isNaN(h) || isNaN(w) || !selectedGender) {
      setFitResult('กรุณากรอกส่วนสูง น้ำหนัก และเลือกเพศให้ครบ');
      return;
    }

    let result = 'ยังไม่มีเกณฑ์สำหรับขนาดนี้';
    const size = product.size;

    if (selectedGender === 'male') {
      if (size === 'M') {
        if (h >= 165 && h <= 175 && w >= 60 && w <= 75) {
          result = 'เหมาะสมกับคุณ (ชาย - พอดี)';
        } else if (h < 165 || w < 60) {
          result = 'อาจหลวมเล็กน้อย (ชาย)';
        } else {
          result = 'อาจคับเกินไป (ชาย)';
        }
      }
    } else if (selectedGender === 'female') {
      if (size === 'M') {
        if (h >= 155 && h <= 165 && w >= 45 && w <= 60) {
          result = 'เหมาะสมกับคุณ (หญิง - พอดี)';
        } else if (h < 155 || w < 45) {
          result = 'อาจหลวมเล็กน้อย (หญิง)';
        } else {
          result = 'อาจคับเกินไป (หญิง)';
        }
      }
    }

    setFitResult(result);
  };

  if (!product) return <div>กำลังโหลดข้อมูล...</div>;

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

      {/* ส่วนเลือกเพศ */}
      <div className="gender-selection">
        <h3>เลือกเพศสำหรับการสวมใส่เสื้อผ้า</h3>
        <div className="gender-options">
          <div
            className={`gender-option ${selectedGender === 'male' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('male')}
            role="button"
            tabIndex={0}
          >
            <img src="/images/Male.png" alt="ชาย" />
            <p>ชาย</p>
          </div>
          <div
            className={`gender-option ${selectedGender === 'female' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('female')}
            role="button"
            tabIndex={0}
          >
            <img src="/images/Female.png" alt="หญิง" />
            <p>หญิง</p>
          </div>
        </div>
        {selectedGender && (
          <div className="gender-note">
            <p><strong>หมายเหตุ:</strong> การคำนวณจะอิงตามสัดส่วนโดยเฉลี่ยของเพศ {selectedGender === 'male' ? 'ชาย' : 'หญิง'} เพื่อความแม่นยำ</p>
          </div>
        )}
      </div>

      {/* กรอกส่วนสูงน้ำหนัก */}
      <div className="body-inputs">
        <h3>กรอกสัดส่วนร่างกายของคุณ</h3>
        <label>
          ส่วนสูง (cm):
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            placeholder="เช่น 165"
          />
        </label>
        <br />
        <label>
          น้ำหนัก (kg):
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="เช่น 55"
          />
        </label>
        <br />
        <button onClick={checkFit}>Let’s START</button>
        {fitResult && <p><strong>ผลลัพธ์:</strong> {fitResult}</p>}
      </div>
    </div>
  );
}
