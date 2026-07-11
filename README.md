# 🔐 Role-Based Authentication System

> A secure authentication REST API built with **Node.js**, **Express.js**, **MongoDB**, and **JWT**, featuring **Email OTP Verification**, **Role-Based Access Control (RBAC)**, and protected routes.

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript,vscode,git,github,postman" />
</p>

---

# 📌 Project Overview

The **Role-Based Authentication System** is a backend REST API that demonstrates secure user authentication and authorization using **JWT**, **Email OTP Verification**, and **Role-Based Access Control (RBAC)**.

Users can register, verify their email through OTP, log in securely, and access resources based on their assigned role.

This project demonstrates real-world backend security concepts commonly used in enterprise applications.

---

# 🎯 Project Objective

Build a secure authentication system that allows users to:

- Register with an email address
- Verify their email using OTP
- Login securely using JWT
- Access protected APIs
- Restrict routes based on user roles

---

# 🚀 Business Scenario

Imagine an organization where different users have different permissions.

For example:

- 👤 Users can access their own profile.
- 👑 Admins can manage system resources.
- Unverified users cannot log in.

This project implements a secure authentication flow that ensures only verified and authorized users can access protected resources.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

---

## 📧 Email OTP Verification

- Generate OTP during registration
- Send OTP via Email
- Verify Email using OTP
- OTP Expiration
- Prevent Login before Verification
- Resend OTP (Optional)

---

## 👤 User Module

Users can

- Register
- Login
- View Protected Profile

---

## 🛡 Role-Based Access Control (RBAC)

Supports multiple roles such as

- Admin
- User

Only authorized users can access protected routes.

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcryptjs

### Email Service

- Nodemailer

### API Testing

- Postman

### Development Tools

- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```text
app
│
├── config
│   ├── db.js
│   └── emailVerify.js
│
├── controller
│   └── auth.controller.js
│
├── middleware
│   ├── auth.js
│   └── allowRoles.js
│
├── model
│   ├── userModel.js
│   └── otpModel.js
│
├── routes
│   └── auth.routes.js
│
├── utils
│   ├── sendEmail.js
│   └── httpStatusCode.js
│
├── public
├── uploads
├── views
│
├── Postman
│   └── Project2.postman_collection.json
│
├── app.js
├── package.json
└── .env
```

---

# 📁 Folder Explanation

## 📂 config

Contains MongoDB database connection and email configuration.

---

## 📂 controller

Contains authentication business logic.

---

## 📂 middleware

Application middleware.

Includes

- JWT Authentication
- Role Authorization

---

## 📂 model

Database models.

Collections

- Users
- OTPs

---

## 📂 routes

Authentication endpoints.

---

## 📂 utils

Reusable helper functions.

---

# 🗄 Database Design

## 👤 User

```javascript
{
    name,
    email,
    password,
    role,
    isVerified,
    createdAt
}
```

---

## 📧 OTP

```javascript
{
    email,
    otp,
    expiresAt
}
```

---

# 🔐 Authentication Flow

```text
User Registration
        │
        ▼
Generate OTP
        │
        ▼
Send Email
        │
        ▼
Verify OTP
        │
        ▼
Activate Account
        │
        ▼
Login
        │
        ▼
Generate JWT
        │
        ▼
Protected Routes
```

---

# 👥 User Roles

## 👑 Admin

- Access Admin Routes
- Manage Protected Resources

---

## 👤 User

- Login
- View Profile
- Access User Routes

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/verify-otp` | Verify Email OTP |
| POST | `/api/auth/resend-otp` | Resend OTP |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/profile` | User Profile |

---

# 🔒 Security Features

- Password Hashing with bcrypt
- JWT Authentication
- Email Verification
- OTP Expiration
- Protected Routes
- Role-Based Authorization
- Environment Variables
- Input Validation

---

# 📬 Postman Collection

A ready-to-use Postman collection is included.

```text
Postman/Project2.postman_collection.json
```

Import it into Postman to test all API endpoints.

---

# ▶ Installation

Clone the repository

```bash
git clone https://github.com/your-username/role-based-auth-system.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL=your_email

EMAIL_PASSWORD=your_email_password
```

Run the application

```bash
npm run dev
```

---

# 💼 Skills Demonstrated

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Email OTP Verification
- Nodemailer
- Password Hashing
- Role-Based Access Control (RBAC)
- Protected Routes
- REST API Development
- MVC Architecture
- API Testing with Postman

---

# 🎓 Learning Outcomes

Building this project helped me understand:

- JWT Authentication
- Email Verification Workflow
- OTP Generation & Expiration
- MongoDB Data Modeling
- Password Hashing
- Role-Based Authorization
- Express Middleware
- REST API Design
- Secure Backend Development

---

# 🚀 Future Improvements

- Refresh Token Authentication
- Forgot Password with OTP
- Multi-Level Roles (Moderator, Super Admin)
- Rate Limiting
- Swagger Documentation
- Docker Deployment
- Unit Testing
- Redis Session Management

---

# 👨‍💻 Author

## Raktim Bhattacharya

**Backend Developer**

### 💻 Tech Stack

Node.js • Express.js • MongoDB • JavaScript • REST APIs

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ **Star** on GitHub.
