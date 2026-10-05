import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { taskReducer, initialTaskState } from './taskReducer';
import { ACTIONS } from './actionTypes';
import { TaskAPI } from '../services/api';

// Create Context
export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // 1. Fetch Tasks from API
  const loadTasks = useCallback(async (status = 'all', search = '') => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await TaskAPI.getTasks(status, search);
      if (response && response.data) {
        dispatch({ type: ACTIONS.SET_TASKS, payload: response.data });
        setIsBackendConnected(true);
      }
    } catch (error) {
      console.warn('Backend API unavailable, using local mock data:', error.message);
      setIsBackendConnected(false);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Could not connect to backend server. Operating in offline mode.'
      });
      // Fallback tasks so UI remains functional
      const fallbackTasks = [
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
      dispatch({ type: ACTIONS.SET_TASKS, payload: fallbackTasks });
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // 2. Add a new Task (POST /api/tasks)
  const addTask = async (text) => {
    if (!text || text.trim() === '') return;
    try {
      const response = await TaskAPI.createTask(text);
      if (response && response.data) {
        dispatch({ type: ACTIONS.ADD_TASK, payload: response.data });
      }
    } catch (error) {
      console.error('Add Task error:', error);
      // Local fallback
      const localTask = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      dispatch({ type: ACTIONS.ADD_TASK, payload: localTask });
    }
  };

  // 3. Toggle Task Status (PATCH /api/tasks/:id/toggle)
  const toggleTask = async (id) => {
    try {
      const response = await TaskAPI.toggleTask(id);
      if (response && response.data) {
        dispatch({ type: ACTIONS.TOGGLE_TASK, payload: response.data });
      }
    } catch (error) {
      console.error('Toggle Task error:', error);
      const target = state.tasks.find((t) => t.id === id);
      if (target) {
        dispatch({
          type: ACTIONS.TOGGLE_TASK,
          payload: { ...target, completed: !target.completed }
        });
      }
    }
  };

  // 4. Edit Task Details (PUT /api/tasks/:id)
  const editTask = async (id, newText) => {
    if (!newText || newText.trim() === '') return;
    try {
      const response = await TaskAPI.updateTask(id, newText);
      if (response && response.data) {
        dispatch({ type: ACTIONS.EDIT_TASK, payload: response.data });
      }
    } catch (error) {
      console.error('Edit Task error:', error);
      const target = state.tasks.find((t) => t.id === id);
      if (target) {
        dispatch({
          type: ACTIONS.EDIT_TASK,
          payload: { ...target, text: newText.trim() }
        });
      }
    }
  };

  // 5. Delete a Task (DELETE /api/tasks/:id)
  const deleteTask = async (id) => {
    try {
      await TaskAPI.deleteTask(id);
      dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    } catch (error) {
      console.error('Delete Task error:', error);
      dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    }
  };

  // 6. Clear All Tasks (DELETE /api/tasks)
  const clearAllTasks = async () => {
    try {
      await TaskAPI.clearAllTasks();
      dispatch({ type: ACTIONS.CLEAR_ALL });
    } catch (error) {
      console.error('Clear All error:', error);
      dispatch({ type: ACTIONS.CLEAR_ALL });
    }
  };

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    isBackendConnected,
    loadTasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    clearAllTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Custom hook to consume TaskContext
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
