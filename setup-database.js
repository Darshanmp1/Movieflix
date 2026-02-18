// Quick script to create the users table in the database
require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  console.log('🔧 Setting up database...');
  
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: true
      }
    });

    console.log('✅ Connected to database');

    // Create users table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableSQL);
    console.log('✅ Users table created successfully!');

    // Check if table exists
    const [tables] = await connection.execute(`SHOW TABLES LIKE 'users'`);
    if (tables.length > 0) {
      console.log('✅ Verified: users table exists');
      
      // Show table structure
      const [columns] = await connection.execute(`DESCRIBE users`);
      console.log('\n📊 Table structure:');
      columns.forEach(col => {
        console.log(`  - ${col.Field}: ${col.Type}`);
      });
    }

    await connection.end();
    console.log('\n✨ Database setup complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
