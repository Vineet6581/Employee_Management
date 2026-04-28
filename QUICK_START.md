# MERN Employee Management System - Quick Start Guide

## Step 1: Install MongoDB

If you don't have MongoDB installed:

- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow MongoDB documentation

Or use **MongoDB Atlas** (Cloud):

- Sign up at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get your connection string and update `.env` file

## Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Update .env with your MongoDB URI (if using Atlas)
# Default local MongoDB URI is already set

# Start the backend server
npm start
```

✅ Backend will run on `http://localhost:5000`

## Step 3: Frontend Setup (in a new terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend will run on `http://localhost:3000`

## Step 4: First Login

1. Open `http://localhost:3000` in your browser
2. Click on **"Register"** button
3. Enter any email and password (e.g., `admin@test.com` / `password123`)
4. You'll be automatically logged in
5. Start managing employees! 🎉

## Common Commands

### Backend

```bash
npm start       # Start production server
npm run dev     # Start with auto-reload
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Troubleshooting

### ❌ MongoDB Connection Failed

- Make sure MongoDB is running
- Check `.env` file MONGO_URI value
- Try with local MongoDB first: `mongodb://localhost:27017/employee_management`

### ❌ Port 5000 or 3000 in use

- Change PORT in `backend/.env`
- Change port in `frontend/vite.config.js`

### ❌ CORS errors

- Ensure backend runs before frontend
- Check if proxy is configured in `vite.config.js`

## Features to Try

1. **Register/Login**: Create admin account
2. **Add Employee**: Click "+ Add Employee" and fill the form
3. **Search**: Use search box to filter employees
4. **Edit**: Click "Edit" to update employee details
5. **Delete**: Click "Delete" to remove employee
6. **Logout**: Click "Logout" to exit

## Database Fields

When adding employee, fill:

- ✅ Name
- ✅ Email (unique)
- ✅ Phone
- ✅ Department (IT, HR, Finance, etc.)
- ✅ Designation (Manager, Developer, etc.)
- ✅ Salary
- ✅ Joining Date
- Status (Active/Inactive/On Leave)

## Project Structure Overview

```
📁 Employee_Management
├── 📁 backend (Node.js + Express + MongoDB)
│   ├── models/ (Database schemas)
│   ├── routes/ (API endpoints)
│   ├── middleware/ (JWT authentication)
│   ├── server.js (Main server)
│   └── package.json
└── 📁 frontend (React + Vite)
    ├── pages/ (Login, Dashboard)
    ├── components/ (EmployeeForm)
    ├── App.jsx (Router setup)
    ├── index.css (Styling)
    └── package.json
```

## Next Steps

After getting comfortable with the system:

- Deploy to cloud (Heroku, Azure, AWS)
- Add more features (reports, analytics)
- Implement more user roles
- Add pagination for large datasets
- Implement authentication for employees

Happy managing! 👍
