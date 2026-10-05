import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';

/**
 * TaskList Component
 * Displays search bar, filter tabs, error banners, and task items.
 */
export function TaskList() {
  const { tasks, loading, error, loadTasks } = useTasks();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks by active tab and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      activeFilter === 'all'
        ? true
        : activeFilter === 'active'
        ? !task.completed
        : task.completed;

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  const totalCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="task-list-container">
      {/* 1. Search Bar */}
      <div className="search-bar-wrapper">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="btn-clear-search"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Filter Tabs */}
      <div className="filter-tabs-wrapper">
        <div className="filter-tabs" role="tablist">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            role="tab"
          >
            All Tasks
            <span className="tab-badge">{totalCount}</span>
          </button>

          <button
            className={`filter-tab ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setActiveFilter('active')}
            role="tab"
          >
            Active
            <span className="tab-badge">{activeCount}</span>
          </button>

          <button
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
            role="tab"
          >
            Completed
            <span className="tab-badge">{completedCount}</span>
          </button>
        </div>
      </div>

      {/* 3. Error Banner (if any) */}
      {error && (
        <div className="api-error-banner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{error}</span>
          <button onClick={() => loadTasks()} className="btn-retry-api">
            Retry
          </button>
        </div>
      )}

      {/* 4. Loading Spinner (only if initial state has no tasks) */}
      {loading && tasks.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Syncing tasks with backend...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        /* 5. Empty State */
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <h3 className="empty-state-title">
            {searchTerm
              ? `No tasks matching "${searchTerm}"`
              : activeFilter === 'completed'
              ? 'No completed tasks yet'
              : activeFilter === 'active'
              ? 'No active tasks! You are all caught up.'
              : 'No tasks found'}
          </h3>
          <p className="empty-state-subtitle">
            {searchTerm
              ? 'Try searching with another keyword.'
              : 'Add a new task above to get started.'}
          </p>
        </div>
      ) : (
        /* 6. List of Task Items */
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
