# MongoDB Authentication Setup Guide

## Prerequisites
1. Make sure you have MongoDB installed and running on your system
2. Node.js and npm should be installed

## Setup Instructions

### 1. Install MongoDB
- Download and install MongoDB Community Server from https://www.mongodb.com/try/download/community
- Start MongoDB service (usually runs on port 27017)

### 2. Update MongoDB Connection String
In `backend/server.js`, update the connection string:
```javascript
const MONGODB_URI = "mongodb://localhost:27017/userAuth"
```

If you're using MongoDB Atlas (cloud), replace with your connection string:
```javascript
const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/userAuth"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Backend Server
```bash
node backend/server.js
```

### 5. Start the Frontend (in a new terminal)
```bash
npm run dev
```

## Features
- **User Registration**: Create new accounts with email and password
- **User Login**: Authenticate existing users
- **Form Validation**: Email format validation and password requirements
- **Error Handling**: Proper error messages for various scenarios
- **MongoDB Integration**: All user data is stored in MongoDB

## API Endpoints
- `POST /register` - Register a new user
- `POST /login` - Login an existing user
- `GET /` - Health check endpoint

## Testing
1. Open your browser to the frontend URL (usually http://localhost:5173)
2. Click "Register" to create a new account
3. Try logging in with the credentials you just created
4. Check your MongoDB database to see the stored user data

## Security Note
This is a basic implementation. For production use, consider:
- Password hashing (bcrypt)
- JWT tokens for authentication
- Input sanitization
- Rate limiting
- HTTPS

