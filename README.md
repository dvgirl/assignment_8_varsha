# 🚀 Fullstack Task Manager (MERN) – React, Express.js & MongoDB

A complete **Fullstack To-Do / Task Manager Application** built with **React** on the frontend and **Node.js, Express.js, and MongoDB** on the backend, implementing the **Controller-Service-Routes** architectural pattern.

---

## 🌟 Key Features

### 🖥️ Frontend (React 19 + Context API + useReducer)
- **Global State Management**: React Context API & `useReducer` to eliminate prop-drilling.
- **REST API Integration**: Clean HTTP requests via **Axios** communicating with the Express backend.
- **Real-Time UI Updates**: Instant updates for Adding, Toggling, Editing, and Deleting tasks.
- **Live Search & Status Filtering**: Instant task search by title/keywords and filtering by `All`, `Active`, and `Completed`.
- **Dynamic Statistics & Progress**: Live counters for Total, Pending, and Completed tasks with an animated completion bar.
- **Error Handling & Loading States**: Graceful error handling banners with retry buttons and smooth loading feedback.
- **Fully Responsive**: Optimized layouts for **Desktop**, **Tablet**, and **Mobile**.

### ⚙️ Backend (Node.js + Express.js + MongoDB / Mongoose)
- **Controller-Service-Routes Pattern**: Clean modular separation of concerns.
- **RESTful Endpoints**: Full CRUD operations matching REST standards.
- **Mongoose Data Modeling**: Validation, timestamps, and schema definitions.
- **Resilient Fallback**: Seamless in-memory store fallback if local MongoDB is offline.
- **CORS & JSON Middleware**: Configured for cross-origin client requests.

---

## 📁 Project Architecture

```
assigment-2-react.js/
├── server/                     # ⚙️ Node.js & Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection with Mongoose
│   ├── models/
│   │   └── Task.js             # Mongoose Task Schema
│   ├── routes/
│   │   └── taskRoutes.js       # Express REST API routes
│   ├── controllers/
│   │   └── taskController.js   # Request / Response handlers
│   ├── services/
│   │   └── taskService.js      # Business logic & DB queries
│   ├── .env                    # Environment variables (PORT, MONGO_URI)
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express application entry point
│
├── src/                        # 🖥️ React Frontend
│   ├── services/
│   │   └── api.js              # Axios API service client
│   ├── context/
│   │   ├── actionTypes.js      # Reducer action constant definitions
│   │   ├── taskReducer.js      # Pure reducer function
│   │   └── TaskContext.jsx     # Context Provider & custom useTasks hook
│   ├── components/
│   │   ├── Header.jsx          # Header with connection badge & date
│   │   ├── TaskInput.jsx       # Input field & Add Task button
│   │   ├── TaskSummary.jsx     # Statistics cards & progress bar
│   │   ├── TaskList.jsx        # Search input, filter tabs & list
│   │   └── TaskItem.jsx        # Task item with toggle, edit & delete
│   ├── App.jsx                 # App root component
│   ├── App.css                 # Responsive styles (Desktop/Tablet/Mobile)
│   ├── index.css               # Global CSS variables & typography
│   └── main.jsx                # React DOM entry
│
├── screenshots/                # 📸 Application screenshots
│   ├── desktop_view.png
│   ├── tablet_view.png
│   └── mobile_view.png
│
├── index.html                  # HTML entry point
├── package.json                # Frontend & root scripts
├── API_DOCUMENTATION.md        # API design specification document
└── README.md                   # Fullstack setup & deployment guide
```

---

## 📡 RESTful API Endpoints Specification

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Get all tasks (supports `?status=` and `?search=`) | None |
| **GET** | `/api/tasks/:id` | Get single task by ID | None |
| **POST** | `/api/tasks` | Create a new task | `{ "text": "Task title" }` |
| **PUT** | `/api/tasks/:id` | Update task title/text | `{ "text": "New title" }` |
| **PATCH** | `/api/tasks/:id/toggle` | Toggle completed boolean status | None |
| **DELETE** | `/api/tasks/:id` | Delete a single task | None |
| **DELETE** | `/api/tasks` | Clear all tasks | None |
| **GET** | `/api/health` | Backend server health check | None |

---

## 🛠️ Environment Variables Configuration

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_manager
NODE_ENV=development
```

### Frontend (`.env` or default)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 How to Setup and Run Locally

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local Community Edition or MongoDB Atlas URI)

### 2. Start Backend Server
```bash
# Navigate to server folder
cd server

# Install backend dependencies
npm install

# Start Express server (runs on http://localhost:5000)
npm start
```

### 3. Start React Frontend
In a new terminal window:
```bash
# Navigate to root folder
cd assigment-2-react.js

# Install frontend dependencies
npm install

# Start Vite dev server (runs on http://localhost:5173 or 5174)
npm run dev
```

---

## 🧪 Testing APIs with Postman

1. **Create Task**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/tasks`
   - Headers: `Content-Type: application/json`
   - Body: `{ "text": "Learn Backend Development" }`

2. **Get Tasks**:
   - Method: `GET`
   - URL: `http://localhost:5000/api/tasks`

3. **Toggle Task Status**:
   - Method: `PATCH`
   - URL: `http://localhost:5000/api/tasks/:id/toggle`

4. **Delete Task**:
   - Method: `DELETE`
   - URL: `http://localhost:5000/api/tasks/:id`

---

## 🌐 Deployment Instructions

### Backend Deployment (Render):
1. Push your code to GitHub.
2. Go to [Render.com](https://render.com) and click **New ➔ Web Service**.
3. Connect your repository.
4. Set **Root Directory** to `server`.
5. **Build Command**: `npm install`
6. **Start Command**: `node server.js`
7. Add Environment Variable `MONGO_URI` (from MongoDB Atlas).

### Frontend Deployment (Netlify / Vercel):
1. Go to [Netlify.com](https://netlify.com).
2. Connect your GitHub repository.
3. **Build Command**: `npm run build`
4. **Publish Directory**: `dist`
5. Add Environment Variable `VITE_API_BASE_URL` pointing to your Render backend URL (e.g., `https://your-api.onrender.com/api`).

---

## 💡 Challenges Faced & Solutions

1. **CORS Configuration**:
   - *Challenge*: The browser blocked requests from `localhost:5174` to `localhost:5000`.
   - *Solution*: Configured `cors()` middleware in `server.js` to allow cross-origin requests.
2. **MongoDB Connection Resiliency**:
   - *Challenge*: If MongoDB isn't running locally on a student's machine, the backend could crash.
   - *Solution*: Implemented an automatic in-memory fallback in `db.js` and `taskService.js` so the server never crashes.
3. **Optimistic & Synchronized UI**:
   - *Challenge*: Keeping the React UI reactive while waiting for network responses.
   - *Solution*: Integrated Axios inside `TaskContext.jsx` and updated state immediately via `taskReducer`.
