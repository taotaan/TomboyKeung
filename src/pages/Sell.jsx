import React, { useState, useEffect } from 'react'; 
import { db, storage, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import '../Style/Sell.css';

function Sell() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    size: '',
    tags: [],
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [userId, setUserId] = useState(null); // ใช้เก็บ UID ของผู้ใช้งาน

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const tagOptions = [
    { value: 'street', label: 'สตรีท' },
    { value: 'vintage', label: 'วินเทจ' },
    { value: 'casual', label: 'ลำลอง' },
    { value: 'sport', label: 'ออกกำลังกาย' },
    { value: 'formal', label: 'ทางการ' },
    { value: 'korean', label: 'เกาหลี' },
    { value: 'japanese', label: 'ญี่ปุ่น' },
  ];

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;

    if (name === 'images') {
      const selectedFiles = Array.from(files).slice(0, 10);
      const combinedFiles = [...formData.images, ...selectedFiles].slice(0, 10);
      setFormData({ ...formData, images: combinedFiles });

      const previewUrls = combinedFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    } else if (name === 'tags') {
      let updatedTags = [...formData.tags];
      if (checked) {
        updatedTags.push(value);
      } else {
        updatedTags = updatedTags.filter(tag => tag !== value);
      }
      setFormData({ ...formData, tags: updatedTags });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('⚠️ กรุณาเข้าสู่ระบบก่อนลงขายสินค้า');
      return;
    }

    try {
      const imageUrls = [];
      for (const image of formData.images) {
        const imageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }

      await addDoc(collection(db, 'products'), {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        size: formData.size,
        tags: formData.tags,
        imageUrls: imageUrls,
        createdAt: Timestamp.now(),
        userId: userId, // 👈 ใส่ userId ผู้ขาย
      });

      alert('✅ ลงขายสำเร็จ!');
      setFormData({ name: '', price: '', description: '', category: '', size: '', tags: [], images: [] });
      setPreviewImages([]);
    } catch (err) {
      console.error(err);
      alert('❌ เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="sell-container">
      <h2>🛍️ ลงขายสินค้า</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        <label>ชื่อสินค้า:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>ราคา (บาท):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>รายละเอียดสินค้า:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <label>หมวดหมู่สินค้า:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">-- เลือกหมวดหมู่ --</option>
          <option value="shirt">เสื้อ</option>
          <option value="trousers">กางเกง</option>
          <option value="hat">หมวก</option>
          <option value="shoe">รองเท้า</option>
        </select>

        <label>สไตล์การแต่งตัว:</label>
        <div className="tags-checkbox-group" style={{ marginBottom: '1rem' }}>
          {tagOptions.map(({ value, label }) => (
            <label key={value} style={{ display: 'block', marginBottom: '0.3rem' }}>
              <input
                type="checkbox"
                name="tags"
                value={value}
                checked={formData.tags.includes(value)}
                onChange={handleChange}
              />{' '}
              {label}
            </label>
          ))}
        </div>

        {formData.tags.length > 0 ? (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {formData.tags.map((tag, index) => {
              const label = tagOptions.find(opt => opt.value === tag)?.label || tag;
              return (
                <span 
                  key={index} 
                  style={{ 
                    backgroundColor: '#eee', 
                    padding: '5px 10px', 
                    borderRadius: '15px', 
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        ) : (
          <p>ยังไม่ได้เลือกสไตล์การแต่งตัว</p>
        )}

        <label>ขนาดสินค้า:</label>
        <select name="size" value={formData.size} onChange={handleChange} required>
          <option value="">-- เลือกขนาด --</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <label>รูปภาพ (สูงสุด 10 รูป):</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleChange}
          multiple
          required
        />

        <div className="preview-images" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
            />
          ))}
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>ขายสินค้า</button>
      </form>
    </div>
  );
}

export default Sell;
