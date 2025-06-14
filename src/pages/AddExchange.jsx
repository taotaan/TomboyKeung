import React, { useEffect, useState } from 'react';
import { db, storage, auth } from '../firebase'; // เพิ่ม auth
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Style/AddExchange.css';

export default function Exchange() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [imageFile, setImageFile] = useState(null);

  const exchangeRef = collection(db, 'exchange');

  useEffect(() => {
    const fetchItems = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('กรุณาเข้าสู่ระบบก่อน');
        return;
      }

      // สร้าง query เฉพาะรายการของ user นี้
      const q = query(exchangeRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `exchange/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    const user = auth.currentUser;
    if (!user) {
      alert('กรุณาเข้าสู่ระบบก่อน');
      return;
    }

    let imageUrl = '';
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
    }

    const itemData = {
      ...newItem,
      imageUrl,
      userId: user.uid,   // เพิ่ม userId ตรงนี้
    };

    await addDoc(exchangeRef, itemData);  // เรียกแค่ครั้งเดียว
    alert('โพสต์สินค้าสำเร็จ!');

    setNewItem({ name: '', description: '' });
    setImageFile(null);

    // โหลดข้อมูลใหม่เฉพาะสินค้าของ user คนนี้
    const q = query(exchangeRef, where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(data);
  };

  return (
    <div className="home-container-ja">
      <h2>รายการแลกเปลี่ยนของคุณ</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อสินค้า"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="รายละเอียด"
          value={newItem.description}
          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
        />
        <button type="submit">โพสต์</button>
      </form>

      <div className="items-list">
        {items.length === 0 && <p>คุณยังไม่มีรายการแลกเปลี่ยน</p>}
        {items.map(item => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{maxWidth: '200px'}} />}
          </div>
        ))}
      </div>
    </div>
  );
}
