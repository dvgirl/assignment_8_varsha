# 📝 Assignment Submission Document: Fullstack To-Do List App (Node.js, Express.js, MongoDB & React)

**Student Name:** [Your Name]  
**Course / Track:** MERN Stack Web Development  
**Assignment Title:** Implementing & Integrating To-Do List APIs (Node.js, Express, MongoDB & React)  
**GitHub Repository Link:** [Paste Your GitHub Repo Link Here]  
**Frontend Live Deployment (Netlify):** [Paste Your Netlify Live Link Here]  
**Backend Live API (Render):** [Paste Your Render Backend URL Here]  

---

## 📌 1. Project Overview & Objectives

This project is a fullstack **MERN To-Do List Application** designed to manage daily tasks seamlessly. 
- **Backend**: Built with **Node.js**, **Express.js**, and **MongoDB** (using Mongoose ODM) following the **Controller-Service-Routes** architectural pattern.
- **Frontend**: Developed with **React 19**, **Context API**, **useReducer hook**, and **Axios** for state management and asynchronous API calls.
- **Key Capabilities**: Full CRUD operations (Create, Read, Update, Delete, Toggle Complete, and Clear All), live keyword search, dynamic status filtering, and visual progress tracking.

---

## 🏛️ 2. Architectural Design: Controller-Service-Routes Pattern

To maintain clean code separation, scalability, and readability, the backend is organized into three distinct layers:

```
server/
├── config/db.js          # Database connection logic
├── models/Task.js        # Mongoose Schema & Data validation
├── routes/taskRoutes.js  # URL endpoints & HTTP verb definitions
├── controllers/taskController.js  # Request validation & HTTP response handling
├── services/taskService.js        # Business logic & database operations
└── server.js             # Express app configuration & middleware
```

### Layer Responsibilities:
1. **Routes Layer (`taskRoutes.js`)**: Maps URL endpoints (`/api/tasks`, `/api/tasks/:id`) to the respective controller actions.
2. **Controller Layer (`taskController.js`)**: Handles HTTP requests, performs input validation (e.g. ensuring task title is not empty), calls the service layer, and returns standardized JSON responses with proper HTTP status codes (`200`, `201`, `400`, `404`, `500`).
3. **Service Layer (`taskService.js`)**: Encapsulates all database interactions (Mongoose queries like `find()`, `create()`, `findByIdAndUpdate()`, `findByIdAndDelete()`) and business logic.
4. **Data Model (`Task.js`)**: Defines the Mongoose schema with fields: `text` (String, required), `completed` (Boolean, default: false), and timestamps (`createdAt`, `updatedAt`).

---

## 📡 3. Implemented REST API Endpoints Specification

| CRUD Operation | HTTP Method | Endpoint URL | Description | Request Body | Response Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/api/tasks` | Creates a new task | `{ "text": "Task Title" }` | `201 Created` |
| **Read** | `GET` | `/api/tasks` | Retrieves all tasks (supports `?status=` & `?search=`) | None | `200 OK` |
| **Read** | `GET` | `/api/tasks/:id` | Retrieves a single task by ID | None | `200 OK` / `404 Not Found` |
| **Update** | `PUT` | `/api/tasks/:id` | Updates task text description | `{ "text": "Updated Title" }` | `200 OK` / `404 Not Found` |
| **Update** | `PATCH` | `/api/tasks/:id/toggle` | Toggles completed boolean (`true`/`false`) | None | `200 OK` / `404 Not Found` |
| **Delete** | `DELETE` | `/api/tasks/:id` | Deletes a task by ID | None | `200 OK` / `404 Not Found` |
| **Delete** | `DELETE` | `/api/tasks` | Clears all tasks from database | None | `200 OK` |
| **Health** | `GET` | `/api/health` | Checks backend server health | None | `200 OK` |

---

## ⚛️ 4. Frontend Integration & State Management

### 1. HTTP Communication with Axios (`src/services/api.js`)
- An Axios instance is configured with base URL `import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'`.
- Dedicated asynchronous functions handle all API calls: `getTasks()`, `createTask()`, `updateTask()`, `toggleTask()`, `deleteTask()`, and `clearAllTasks()`.

### 2. Context API & useReducer Hook (`src/context/`)
- All application state (`tasks`, `loading`, `error`, `isBackendConnected`) is managed centrally in `TaskContext.jsx`.
- When an API call succeeds, the context dispatches a corresponding action to `taskReducer.js` (`SET_TASKS`, `ADD_TASK`, `TOGGLE_TASK`, `EDIT_TASK`, `DELETE_TASK`, `CLEAR_ALL`).
- This completely eliminates prop-drilling and ensures immediate UI reactivity.

### 3. Dynamic UI Enhancements
- **Live Search**: Instant client-side search filtering tasks by keywords.
- **Filter Tabs**: Tabs for `All Tasks`, `Active`, and `Completed` with live numeric badges.
- **Connection Badge**: Live header indicator showing fullstack backend connectivity status.
- **Progress Tracking**: Real-time statistical counters and percentage progress bar.
- **Error Banners & Loading Spinners**: User-friendly feedback with retry functionality during network errors.

---

## ⚙️ 5. Configuration & Environment Variables

### Backend Configuration (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_manager
NODE_ENV=development
```

### Frontend Configuration (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🛠️ 6. How to Set Up and Run Locally

### Step 1: Start the Backend Server
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

### Step 2: Start the React Frontend
In a new terminal window:
```bash
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🧪 7. API Testing with Postman

1. **POST `/api/tasks`**:
   - Sent JSON `{ "text": "Test Task" }` ➔ Received `201 Created` with unique ID and timestamp.
2. **GET `/api/tasks`**:
   - Sent request ➔ Received `200 OK` with JSON array of tasks.
3. **PATCH `/api/tasks/:id/toggle`**:
   - Sent request ➔ Received `200 OK` with `completed: true`.
4. **PUT `/api/tasks/:id`**:
   - Sent JSON `{ "text": "Updated Task Text" }` ➔ Received `200 OK` with updated task object.
5. **DELETE `/api/tasks/:id`**:
   - Sent request ➔ Received `200 OK` with confirmation message.

---

## 💡 8. Key Decisions Made During Enhancement

1. **Adopting the Controller-Service-Routes Pattern**: Rather than writing all database logic directly in route handlers, separating logic into services makes testing and code maintenance straightforward.
2. **Automated Mongoose Schema Output Transformation**: Added a `toJSON` transform in the Mongoose schema so `_id` is automatically mapped to `id` and `__v` is removed, keeping frontend consumption clean and consistent.
3. **Resilient In-Memory Fallback Mechanism**: Built an automatic fallback mode into `db.js` and `taskService.js`. If MongoDB local service is temporarily unavailable, the API switches seamlessly to memory mode without crashing.
4. **Optimistic/Reactive State Updates in React**: State is updated immediately via `useReducer` to ensure a snappy user experience while network requests process.

---

## ⚠️ 9. Challenges Faced & Solutions

1. **CORS (Cross-Origin Resource Sharing) Errors**:
   - *Challenge*: The React frontend on port `5174` was initially blocked by the browser when making requests to the Express server on port `5000`.
   - *Solution*: Enabled and configured the `cors()` middleware in `server.js` to allow cross-origin requests.

2. **Synchronizing State Without Page Reloads**:
   - *Challenge*: Tasks needed to reflect modifications immediately without requiring the user to refresh the page.
   - *Solution*: Integrated API responses directly into React Context's `useReducer` dispatch flow, so state updates trigger instant component re-renders.

3. **Handling Asynchronous API Errors Gracefully**:
   - *Challenge*: Server down or network timeouts could result in an unhandled crash or blank screen.
   - *Solution*: Wrapped all API calls in `try/catch` blocks, set an Axios timeout (5s), and implemented an inline error banner with a "Retry" button.

---

## 🚀 10. Deployment Summary

- **Backend Deployment (Render)**:
  - Repository linked to Render Web Service.
  - Root directory set to `server`, build command `npm install`, start command `node server.js`.
  - Environment variable `MONGO_URI` connected to MongoDB Atlas.
- **Frontend Deployment (Netlify)**:
  - Repository linked to Netlify.
  - Build command: `npm run build`, Publish directory: `dist`.
  - Environment variable: `VITE_API_BASE_URL` pointing to the deployed Render backend API.
