import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskSummary } from './components/TaskSummary';
import { TaskList } from './components/TaskList';
import './App.css';

/**
 * Main App Component
 * Integrates all components wrapped in the TaskProvider Context.
 */
function App() {
  return (
    <TaskProvider>
      <div className="app-layout">
        <div className="task-manager-container">
          {/* 1. Header Section */}
          <Header />

          {/* 2. Global State Summary (Total, Pending, Completed, Progress) */}
          <TaskSummary />

          {/* 3. Task Input Section (Dispatches ADD_TASK) */}
          <TaskInput />

          {/* 4. Filterable Task List (Dispatches TOGGLE, EDIT, DELETE) */}
          <TaskList />

          {/* 5. Footer Info */}
          <footer className="app-footer">
            <p>
              Task Manager • Built with <strong>React Context API</strong> &{' '}
              <strong>useReducer</strong>
            </p>
          </footer>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
