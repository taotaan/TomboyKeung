import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../Style/ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams(); // ดึง id จาก URL
  const [product, setProduct] = useState(null);

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
    </div>
  );
}
