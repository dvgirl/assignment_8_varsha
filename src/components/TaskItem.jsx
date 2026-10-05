import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

/**
 * TaskItem Component
 * Handles:
 * - Marking task complete/incomplete (PATCH /api/tasks/:id/toggle)
 * - Editing task text (PUT /api/tasks/:id)
 * - Deleting task (DELETE /api/tasks/:id)
 */
export function TaskItem({ task }) {
  const { toggleTask, editTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    editTask(task.id, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') handleCancelEdit();
  };

  // Format time from timestamp/ISO string
  const formatTime = (timeValue) => {
    if (!timeValue) return '';
    try {
      const date = new Date(timeValue);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    } catch {
      // Return raw string if formatting fails
    }
    return timeValue;
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* 1. Completion Toggle Checkbox */}
      <label
        className="checkbox-container"
        title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className="custom-checkbox">
          {task.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>
      </label>

      {/* 2. Task Content / Inline Edit */}
      <div className="task-content">
        {isEditing ? (
          <div className="task-edit-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="task-edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <div className="task-text-group">
            <span
              className={`task-text ${task.completed ? 'text-completed' : ''}`}
              onDoubleClick={() => !task.completed && setIsEditing(true)}
              title="Double click to edit"
            >
              {task.text}
            </span>
            {task.createdAt && (
              <span className="task-time">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {formatTime(task.createdAt)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. Action Buttons */}
      <div className="task-actions">
        {isEditing ? (
          <div className="btn-group-edit">
            <button
              onClick={handleSaveEdit}
              className="btn-action btn-save"
              title="Save changes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Save</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-action btn-cancel"
              title="Cancel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>Cancel</span>
            </button>
          </div>
        ) : (
          <div className="btn-group-normal">
            <button
              onClick={() => setIsEditing(true)}
              className="btn-action btn-edit"
              title="Edit task"
              disabled={task.completed}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Edit</span>
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="btn-action btn-delete"
              title="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
