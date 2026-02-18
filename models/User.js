const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create new user
  static async create(userData) {
    const { username, name, email, phone, password } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (username, name, email, phone, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [username, name, email, phone, hashedPassword]);
    return result.insertId;
  }

  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.execute(query, [username]);
    return rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT id, username, name, email, phone, created_at FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  // Compare password
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Check if username exists
  static async usernameExists(username) {
    const user = await this.findByUsername(username);
    return !!user;
  }

  // Check if email exists
  static async emailExists(email) {
    const user = await this.findByEmail(email);
    return !!user;
  }
}

module.exports = User;
