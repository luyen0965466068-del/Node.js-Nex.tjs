// backend/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // ĐOẠN QUAN TRỌNG NHẤT ĐỂ SỬA LỖI:
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
    console.error('❌ MySQL connection failed:', err);
    // Lưu ý: Đừng exit(1) ở đây để tránh server sập liên tục khi deploy
  }
}

testConnection();

module.exports = pool;
