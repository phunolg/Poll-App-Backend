# 🗳️ Poll App – Online Survey Management System

## 📌 Overview

**Poll App** is a web-based survey application that enables users to create, manage, and participate in polls. Built with **Node.js**, **Express.js**, and **MongoDB**, it supports authentication, role-based access, and a full set of RESTful APIs, optimized for both manual and containerized deployment.

---

## 🚀 Key Features

### 🗳️ Poll Management
- **Create Polls** – Admins can create polls with multiple options
- **Read Polls** – Users can view all polls or individual polls by ID
- **Update Polls** – Admins can edit existing polls
- **Delete Polls** – Admins can remove polls
- **Lock/Unlock Polls** – Control voting availability via poll state

### 📊 Vote Management
- **Submit Votes** – Users can vote on available polls
- **View Votes** – Filter by poll ID or user ID
- **Cancel Votes** – Users can remove specific choices
- **Delete Votes** – Admins can remove votes by ID or poll

### 👥 User Management
- **Authentication** – Login system with JWT-based auth
- **Authorization** – Role-based access control (Admin/User)
- **Security Middleware** – Token validation and route protection

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker, Docker Compose
- **Code Style:** ESLint + Prettier (Airbnb Style Guide)
- **Development Tools:** Nodemon, Babel (ES6+)

---

## 🗂️ Project Structure

```
src/
├── controllers/       # Business logic
├── models/            # Mongoose models
├── routes/            # API route handlers
├── middleware/        # Auth & validation middlewares
├── services/          # Internal services
├── config/            # App configs (DB, Email, etc.)
├── database/          # DB connection setup
└── index.js           # App entry point
```

---

## 🔌 API Endpoints

### 📍 Polls

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| POST   | /polls/create             | Create new poll       |
| GET    | /polls                    | List all polls        |
| GET    | /polls/:pollId           | Get poll by ID        |
| PUT    | /polls/:pollId           | Update poll           |
| DELETE | /polls/:pollId           | Delete poll           |
| PUT    | /polls/:pollId/lock      | Lock poll             |
| PUT    | /polls/:pollId/unlock    | Unlock poll           |

### 📍 Votes

| Method | Endpoint                      | Description                |
|--------|-------------------------------|----------------------------|
| POST   | /votes/create                 | Submit vote                |
| GET    | /votes/poll/:pollId           | View votes by poll         |
| GET    | /votes/user/:userId           | View votes by user         |
| DELETE | /votes/unvote                 | Cancel specific vote       |
| DELETE | /votes/poll/:pollId           | Delete votes by poll (Admin) |
| DELETE | /votes/:voteId                | Delete vote by ID (Admin) |

---

## ⚙️ Getting Started

### 📦 Prerequisites
- Node.js (v18+)
- MongoDB
- Docker (optional for containerization)

### 🔧 Manual Setup

```bash
git clone <repository-url>
cd S_group_backend
npm install
cp .env.example .env
# Fill in your environment variables
npm run dev   # For development
npm start     # For production
```

### 🐳 Docker Setup

```bash
# Start with docker-compose
docker-compose up -d

# Or build and run manually
docker build -t poll-app .
docker run -p 3000:3000 poll-app
```

---

## 🔐 Environment Variables

Create a `.env` file with the following:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/poll_app
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 🧪 Code Standards & Workflow

- Follow **Airbnb JavaScript Style Guide**
- Use ESLint and Prettier
- Commit with clear messages
- Use feature branches & Pull Requests

---

## 🚀 Deployment

### Production Environment
- Deployed on **AWS EC2**
- Managed with **Docker**
- Configured via **Nginx + SSL**
- CI/CD via **GitHub Actions**

---

## 🔒 Security Features

- JWT-based authentication
- Role-based authorization
- Input validation & sanitization
- Centralized error handling
- CORS configuration

---

