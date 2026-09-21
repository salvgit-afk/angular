import { createReducer, on } from '@ngrx/store';
import { Task } from '../../task.service';
import { loadTasks, loadTasksSuccess, loadTasksFailure, addTask, deleteTask, toggleTask } from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,

  on(loadTasks, state => ({ ...state, loading: true, error: null })),

  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, loading: false })),

  on(loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(addTask, (state, { titolo, priorita, scadenza }) => ({
    ...state,
    tasks: [
      ...state.tasks,
      { id: crypto.randomUUID(), titolo, completato: false, dataCreazione: new Date(), priorita, scadenza }
    ]
  })),

  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  })),

  on(toggleTask, (state, { id, nuovoStato }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === id ? { ...t, completato: nuovoStato } : t)
  }))
);