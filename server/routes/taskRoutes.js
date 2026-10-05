const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * Task Routes
 * Base Path: /api/tasks
 */

// Route: /api/tasks
router
  .route('/')
  .get(taskController.getTasks)        // GET /api/tasks
  .post(taskController.createTask)     // POST /api/tasks
  .delete(taskController.clearTasks);  // DELETE /api/tasks (Clear all)

// Route: /api/tasks/:id
router
  .route('/:id')
  .get(taskController.getTaskById)     // GET /api/tasks/:id
  .put(taskController.updateTask)      // PUT /api/tasks/:id
  .delete(taskController.deleteTask);  // DELETE /api/tasks/:id

// Route: /api/tasks/:id/toggle
router
  .route('/:id/toggle')
  .patch(taskController.toggleTask);   // PATCH /api/tasks/:id/toggle

module.exports = router;
