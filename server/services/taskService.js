const Task = require('../models/Task');
const { getDBStatus } = require('../config/db');

// In-memory fallback array for local testing if MongoDB daemon isn't running
let inMemoryTasks = [
  {
    id: '1',
    text: 'Learn React Context API & useReducer',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    text: 'Build Express.js & MongoDB REST APIs',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    text: 'Integrate Fullstack Frontend & Backend',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

/**
 * Task Service Layer
 * Contains business logic and database queries for Task operations.
 */
class TaskService {
  /**
   * 1. Get All Tasks (Supports search and status filter)
   */
  async getAllTasks(status, search) {
    if (getDBStatus()) {
      // Seed default tasks if empty
      const count = await Task.countDocuments();
      if (count === 0) {
        await Task.insertMany([
          { text: 'Learn React Context API & useReducer', completed: true },
          { text: 'Build Express.js & MongoDB REST APIs', completed: false },
          { text: 'Integrate Fullstack Frontend & Backend', completed: false }
        ]);
      }

      const query = {};
      if (status === 'active') query.completed = false;
      if (status === 'completed') query.completed = true;
      if (search && search.trim() !== '') {
        query.text = { $regex: search.trim(), $options: 'i' };
      }
      return await Task.find(query).sort({ createdAt: -1 });
    }

    // Fallback: In-memory store
    let results = [...inMemoryTasks];
    if (status === 'active') results = results.filter((t) => !t.completed);
    if (status === 'completed') results = results.filter((t) => t.completed);
    if (search && search.trim() !== '') {
      results = results.filter((t) =>
        t.text.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
    return results;
  }

  /**
   * 2. Get Single Task by ID
   */
  async getTaskById(id) {
    if (getDBStatus()) {
      return await Task.findById(id);
    }

    return inMemoryTasks.find((t) => t.id === id) || null;
  }

  /**
   * 3. Create a New Task
   */
  async createTask(text) {
    if (getDBStatus()) {
      return await Task.create({ text: text.trim() });
    }

    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    inMemoryTasks.unshift(newTask);
    return newTask;
  }

  /**
   * 4. Update Task Details (Text)
   */
  async updateTask(id, text) {
    if (getDBStatus()) {
      return await Task.findByIdAndUpdate(
        id,
        { text: text.trim() },
        { new: true, runValidators: true }
      );
    }

    const index = inMemoryTasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    inMemoryTasks[index].text = text.trim();
    return inMemoryTasks[index];
  }

  /**
   * 5. Toggle Task Completed Status
   */
  async toggleTaskStatus(id) {
    if (getDBStatus()) {
      const task = await Task.findById(id);
      if (!task) return null;
      task.completed = !task.completed;
      await task.save();
      return task;
    }

    const index = inMemoryTasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    inMemoryTasks[index].completed = !inMemoryTasks[index].completed;
    return inMemoryTasks[index];
  }

  /**
   * 6. Delete a Task by ID
   */
  async deleteTask(id) {
    if (getDBStatus()) {
      return await Task.findByIdAndDelete(id);
    }

    const index = inMemoryTasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const deleted = inMemoryTasks.splice(index, 1);
    return deleted[0];
  }

  /**
   * 7. Clear All Tasks
   */
  async clearAllTasks() {
    if (getDBStatus()) {
      await Task.deleteMany({});
      return true;
    }

    inMemoryTasks = [];
    return true;
  }
}

module.exports = new TaskService();
