import React from 'react';
import { useTasks } from '../context/TaskContext';

/**
 * TaskSummary Component
 * Displays statistical summary of tasks: Total, Completed, Pending, and Completion Rate.
 * Also includes a button to Clear All Tasks.
 */
export function TaskSummary() {
  const { tasks, clearAllTasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleClearAll = () => {
    if (totalTasks === 0) return;
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      clearAllTasks();
    }
  };

  return (
    <div className="task-summary-card">
      <div className="summary-stats-grid">
        {/* Total Tasks Stat */}
        <div className="stat-box stat-total">
          <div className="stat-icon-wrapper total-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{totalTasks}</span>
          </div>
        </div>

        {/* Pending Tasks Stat */}
        <div className="stat-box stat-pending">
          <div className="stat-icon-wrapper pending-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingTasks}</span>
          </div>
        </div>

        {/* Completed Tasks Stat */}
        <div className="stat-box stat-completed">
          <div className="stat-icon-wrapper completed-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedTasks}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Clear All Section */}
      <div className="summary-footer">
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-title">Progress</span>
            <span className="progress-percentage">{completionPercentage}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {totalTasks > 0 && (
          <button
            onClick={handleClearAll}
            className="btn-clear-all"
            title="Clear all tasks from the list"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Clear All</span>
          </button>
        )}
      </div>
    </div>
  );
}
