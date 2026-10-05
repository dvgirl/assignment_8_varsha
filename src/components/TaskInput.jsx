import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

/**
 * TaskInput Component
 * Provides an input field and button to add new tasks into global state.
 */
export function TaskInput() {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskText.trim()) {
      setError('Please enter a task title before adding!');
      return;
    }

    // Call context helper which dispatches ADD_TASK
    addTask(taskText);
    setTaskText('');
    setError('');
  };

  return (
    <div className="task-input-section">
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-wrapper">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <input
            type="text"
            className="task-input-field"
            placeholder="Add a new task (e.g. Complete React assignment)..."
            value={taskText}
            onChange={(e) => {
              setTaskText(e.target.value);
              if (error) setError('');
            }}
            aria-label="New task input"
          />
        </div>
        <button type="submit" className="btn-add-task">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add Task</span>
        </button>
      </form>
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
}
