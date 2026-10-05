import axios from 'axios';

// Base API URL configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // 5 seconds timeout
});

/**
 * Task API Service
 * Encapsulates all HTTP request methods communicating with Express & MongoDB backend
 */
export const TaskAPI = {
  // 1. Fetch all tasks with optional filter and search
  async getTasks(status = 'all', search = '') {
    const params = {};
    if (status && status !== 'all') params.status = status;
    if (search && search.trim() !== '') params.search = search.trim();

    const response = await apiClient.get('/tasks', { params });
    return response.data;
  },

  // 2. Get single task by ID
  async getTaskById(id) {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  // 3. Create a new task
  async createTask(text) {
    const response = await apiClient.post('/tasks', { text });
    return response.data;
  },

  // 4. Update task text
  async updateTask(id, text) {
    const response = await apiClient.put(`/tasks/${id}`, { text });
    return response.data;
  },

  // 5. Toggle task completed status
  async toggleTask(id) {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  // 6. Delete a single task
  async deleteTask(id) {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  // 7. Clear all tasks
  async clearAllTasks() {
    const response = await apiClient.delete('/tasks');
    return response.data;
  },

  // 8. Health check
  async checkHealth() {
    const response = await apiClient.get('/health');
    return response.data;
  }
};
