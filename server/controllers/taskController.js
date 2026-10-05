const taskService = require('../services/taskService');

/**
 * Task Controller Layer
 * Handles incoming HTTP requests, validates inputs, and sends structured JSON responses.
 */

// 1. GET /api/tasks (Get all tasks with optional status and search filters)
exports.getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const tasks = await taskService.getAllTasks(status, search);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/tasks/:id (Get single task by ID)
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 3. POST /api/tasks (Create a new task)
exports.createTask = async (req, res, next) => {
  try {
    const { text } = req.body;

    // Validation
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title (text) is required and cannot be empty'
      });
    }

    const newTask = await taskService.createTask(text);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

// 4. PUT /api/tasks/:id (Update task text)
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Validation
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task text is required for update'
      });
    }

    const updatedTask = await taskService.updateTask(id, text);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

// 5. PATCH /api/tasks/:id/toggle (Toggle completed status)
exports.toggleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.toggleTaskStatus(id);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

// 6. DELETE /api/tasks/:id (Delete a single task)
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      deletedId: id
    });
  } catch (error) {
    next(error);
  }
};

// 7. DELETE /api/tasks (Clear all tasks)
exports.clearTasks = async (req, res, next) => {
  try {
    await taskService.clearAllTasks();

    return res.status(200).json({
      success: true,
      message: 'All tasks cleared successfully'
    });
  } catch (error) {
    next(error);
  }
};
