import { ACTIONS } from './actionTypes';

/**
 * Initial State for Task Context
 */
export const initialTaskState = {
  tasks: [
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
  ],
  loading: false,
  error: null
};

/**
 * Task Reducer Function
 * Handles state transitions for tasks, loading indicators, and error states.
 */
export function taskReducer(state, action) {
  switch (action.type) {
    // 1. Set loading state
    case ACTIONS.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }

    // 2. Set error state
    case ACTIONS.SET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    // 3. Set full list of tasks fetched from backend
    case ACTIONS.SET_TASKS: {
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null
      };
    }

    // 4. Add a new task returned from POST /api/tasks
    case ACTIONS.ADD_TASK: {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
        error: null
      };
    }

    // 5. Update a task (after Toggle status or Edit text)
    case ACTIONS.TOGGLE_TASK:
    case ACTIONS.EDIT_TASK: {
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
        loading: false,
        error: null
      };
    }

    // 6. Delete a task from the list
    case ACTIONS.DELETE_TASK: {
      const deletedId = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== deletedId),
        loading: false,
        error: null
      };
    }

    // 7. Clear all tasks
    case ACTIONS.CLEAR_ALL: {
      return {
        ...state,
        tasks: [],
        loading: false,
        error: null
      };
    }

    default:
      return state;
  }
}
