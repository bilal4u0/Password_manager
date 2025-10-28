# MongoDB Connection Setup Guide

## Quick Fix Steps:

### 1. Check if MongoDB is Running
Open Command Prompt/Terminal and run:
```bash
mongod --version
```
If this shows an error, MongoDB is not installed.

### 2. Install MongoDB (if not installed)
**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Install with default settings
- MongoDB will start automatically as a service

**Alternative - Use MongoDB Atlas (Cloud):**
- Go to: https://www.mongodb.com/atlas
- Create free account
- Create a cluster
- Get connection string

### 3. Start MongoDB Service
**Windows:**
- Press `Win + R`
- Type `services.msc`
- Find "MongoDB" service
- Right-click → Start (if not running)

**Or use Command Prompt:**
```bash
net start MongoDB
```

### 4. Test Connection
Run your backend:
```bash
node backend/server.js
```

You should see:
```
Connected to MongoDB
Example app listening on port 3000
```

### 5. If Still Not Working - Try These:

**Option 1: Use MongoDB Atlas (Cloud)**
Replace the connection string in `backend/server.js`:
```javascript
const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/userAuth"
```

**Option 2: Use Different Port**
```javascript
const MONGODB_URI = "mongodb://localhost:27018/userAuth"
```

**Option 3: Remove Database Name**
```javascript
const MONGODB_URI = "mongodb://localhost:27017"
```

### 6. Common Error Messages:

**"MongoServerError: connect ECONNREFUSED"**
- MongoDB is not running
- Start MongoDB service

**"MongoParseError: Invalid connection string"**
- Check your connection string format
- Make sure it starts with `mongodb://`

**"MongoServerError: Authentication failed"**
- Wrong username/password
- Check your credentials

### 7. Quick Test Commands:

**Check if MongoDB is running:**
```bash
mongo --eval "db.adminCommand('ismaster')"
```

**Check MongoDB status:**
```bash
sc query MongoDB
```

## Need Help?
1. Make sure MongoDB is installed and running
2. Check the connection string in your code
3. Try using MongoDB Atlas (cloud version)
4. Check the console for specific error messages
