# 🎬 MovieFlix - Netflix-Style Movie App

A full-stack movie browsing application with Netflix-inspired UI, user authentication, and real movie data.

## 🚀 Features

- 🔐 **User Authentication** - Register and login with MySQL database
- 🎥 **Movie Browsing** - Browse movies by categories (Trending, Top Rated, Popular, Action, Comedy, Upcoming)
- 🔍 **Search** - Search for any movie in real-time
- 🎨 **Netflix UI** - Authentic Netflix-style interface with smooth animations
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

**Frontend:**
- React 18.2
- React Router DOM
- Axios
- CSS3

**Backend:**
- Node.js + Express
- MySQL (Aiven Cloud)
- JWT Authentication
- bcrypt for password hashing

**API:**
- OMDb API for movie data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movieswebpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Configure environment variables**
   
   Edit the `.env` file in the root directory with your credentials:
   ```
   # MySQL Database (Aiven)
   DB_HOST=your_mysql_host
   DB_PORT=4000
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   
   # OMDb API Key
   REACT_APP_OMDB_API_KEY=your_omdb_api_key
   
   # Server Config
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   node setup-database.js
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

   The app will open at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🔑 Getting API Keys

### OMDb API Key (Free)
1. Go to http://www.omdbapi.com/apikey.aspx
2. Choose the FREE tier (1,000 daily requests)
3. Enter your email and verify
4. Copy your API key and add it to `.env`

### Aiven MySQL Database (Free)
1. Sign up at https://console.aiven.io/
2. Create a new MySQL service (free tier available)
3. Copy the connection details to `.env`

### JWT Secret
Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📁 Project Structure

```
movieswebpage/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/       # Login & Register
│   │   │   └── Movies/     # Movie components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── config/
│   └── database.js         # MySQL connection
├── models/
│   └── User.js             # User model
├── routes/
│   └── auth.js             # Authentication routes
├── database/
│   └── schema.sql          # Database schema
├── .env                    # Environment variables
├── server.js               # Express server
├── setup-database.js       # DB setup script
└── package.json
```

## 🎯 Usage

1. **Register** - Create a new account with username, name, email, phone, and password
2. **Login** - Sign in with your credentials
3. **Browse Movies** - Explore different movie categories
4. **Search** - Use the search bar to find specific movies
5. **View Details** - Click any movie to see more information

## 🔒 Authentication

- Passwords are hashed using **bcrypt**
- Sessions managed with **JWT tokens** (30-day expiration)
- Protected routes ensure users must login to access movies

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Response Format
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Windows
Stop-Process -Name node -Force

# Linux/Mac
killall node
```

**Database connection error:**
- Verify your MySQL credentials in `.env`
- Check if MySQL service is running on Aiven

**Movies not loading:**
- Verify OMDb API key is correct in `.env`
- Check browser console for errors

**React not starting:**
```bash
cd client
npm install --force
cd ..
npm run dev
```

## 📝 Scripts

- `npm run dev` - Run both frontend and backend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm start` - Run backend in production mode

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 🙏 Credits

- Movie data from [OMDb API](http://www.omdbapi.com/)
- UI inspired by Netflix
- Built with React, Node.js, Express, and MySQL

---

**Made with ❤️ by Your Team**
