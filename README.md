# Employee Management System - MERN Stack

A complete Employee Management System built with MongoDB, Express, React, and Node.js.

## Project Structure

```
Employee_Management/
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── employees.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   └── EmployeeForm.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env
```

## Features

### Backend Features

- User Authentication with JWT
- Admin Registration and Login with bcrypt password hashing
- Employee CRUD operations (Create, Read, Update, Delete)
- Protected routes with JWT middleware
- MongoDB integration
- CORS enabled for cross-origin requests

### Frontend Features

- React Router for navigation
- Login and Registration forms
- Employee Dashboard with employee table
- Search functionality to filter employees
- Add, Edit, and Delete employee functionality
- Responsive design with clean UI
- Simple white background with gray borders and black buttons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your MongoDB URI and JWT secret:

```
MONGO_URI=mongodb://localhost:27017/employee_management
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
```

4. Start the backend server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Running the Application

1. Start MongoDB (if running locally)
2. Start the backend server:

```bash
cd backend
npm start
```

3. In a new terminal, start the frontend:

```bash
cd frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new admin
- `POST /api/auth/login` - Login admin

### Employees

- `GET /api/employees` - Get all employees (requires JWT)
- `GET /api/employees/:id` - Get single employee (requires JWT)
- `POST /api/employees` - Create new employee (requires JWT)
- `PUT /api/employees/:id` - Update employee (requires JWT)
- `DELETE /api/employees/:id` - Delete employee (requires JWT)

## Login Credentials

To test the application:

1. Click "Register" to create a new admin account
2. Use any email and password to register
3. You'll be automatically logged in after registration
4. Start adding employees!

## Employee Fields

- **Name** - Employee's full name
- **Email** - Email address (unique)
- **Phone** - Contact phone number
- **Department** - Department (IT, HR, Finance, Marketing, Sales, Operations)
- **Designation** - Job title (Manager, Senior Developer, Developer, etc.)
- **Salary** - Annual salary
- **Joining Date** - Date when employee joined
- **Status** - Employee status (Active, Inactive, On Leave)

## UI Design

- **White background** with clean layout
- **Gray borders** for form inputs and tables (#cccccc)
- **Black buttons** (#000000) for primary actions
- **Simple and intuitive** interface
- **Responsive design** for mobile and desktop

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT authentication)
- CORS

### Frontend

- React 18
- React Router v6
- Vite
- Axios
- CSS3

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected API routes
- CORS configuration
- Input validation

## Future Enhancements

- Add employee performance ratings
- Implement department management
- Add salary slip generation
- Email notifications
- Export employee data to PDF/Excel
- Advanced search and filtering
- User role-based access control

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check MONGO_URI in .env file
- For MongoDB Atlas, make sure your IP is whitelisted

### CORS Error

- Ensure backend is running on port 5000
- Check proxy configuration in vite.config.js

### Port Already in Use

- Change the port in .env file or vite.config.js
- Or kill the process using that port

## License

This project is open source and available under the MIT License.
