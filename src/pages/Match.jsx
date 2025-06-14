import React from 'react';
import '../Style/Match.css'; // สร้างหรือเชื่อมต่อไฟล์ CSS หากมี

function Match() {
  return (
    <div className="match-container">
      <h2>🧥 หน้าจอแมทชุด</h2>
      <p>เลือกชุดที่เหมาะกับคุณตามเพศและสไตล์</p>
      {/* ใส่เนื้อหาเพิ่ม เช่น รายการชุดชาย/หญิง */}
    </div>
  );
}

export default Match;