// ตัวอย่างในไฟล์ Chat.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import '../Style/Chat.css';

export default function Chat() {
  const { state } = useLocation();
  const { productId, ownerId } = state || {};

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const userId = 'user1'; 
  const sortedIds = [userId, ownerId].sort();
  const chatRoomId = productId ? `chat_${productId}_${sortedIds[0]}_${sortedIds[1]}` : 'default_room';

  useEffect(() => {
    if (!chatRoomId) return;
    const q = query(
      collection(db, 'chats', chatRoomId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'chats', chatRoomId, 'messages'), {
      text: newMessage,
      senderId: userId,
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h2>💬 แชทเกี่ยวกับสินค้า</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.senderId === userId ? 'own' : 'other'}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="พิมพ์ข้อความ..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>ส่ง</button>
      </div>
    </div>
  );
}
