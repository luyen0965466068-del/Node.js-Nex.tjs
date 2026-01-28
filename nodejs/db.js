// backend/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  // Lấy thông tin từ Environment Variables trên Render
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // TiDB Cloud dùng cổng 4000
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Cấu hình TLS bắt buộc theo tài liệu TiDB Cloud
  ssl: {
    // Cho phép kết nối bảo mật mà không cần tải file chứng chỉ CA
    rejectUnauthorized: false 
  }
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL');
    connection.release();
  } catch (err) {
    // In ra lỗi cụ thể nếu kết nối thất bại
    console.error('❌ MySQL connection failed:', err.message);
  }
}

testConnection();

module.exports = pool;
