// backend/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  // Ưu tiên lấy biến môi trường từ Render, nếu không có sẽ dùng giá trị mặc định
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'kinhdoamthuc',
  // TiDB dùng cổng 4000, localhost thường dùng 3306
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // BẮT BUỘC có SSL để kết nối TiDB Cloud thành công
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    // Không dùng process.exit(1) để tránh server sập khi đang deploy
  }
}

testConnection();

module.exports = pool;
