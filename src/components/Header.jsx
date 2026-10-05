import React from 'react';
import { useTasks } from '../context/TaskContext';

/**
 * Header Component
 * Displays application title, live date, and fullstack connection badge.
 */
export function Header() {
  const { isBackendConnected } = useTasks();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="app-header">
      <div className={`header-badge ${isBackendConnected ? 'badge-connected' : ''}`}>
        <span className="badge-dot"></span>
        {isBackendConnected
          ? 'Fullstack • Express.js & MongoDB Connected'
          : 'React State • Context API & useReducer'}
      </div>
      <h1 className="header-title">Task Manager</h1>
      <p className="header-subtitle">
        Manage your tasks with fullstack REST APIs, Express.js, MongoDB & React.
      </p>
      <div className="header-date">
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>{today}</span>
      </div>
    </header>
  );
}
