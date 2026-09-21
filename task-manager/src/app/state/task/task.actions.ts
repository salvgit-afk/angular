import { createAction, props } from '@ngrx/store';
import { Task } from '../../task.service';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ titolo: string; priorita?: Task['priorita']; scadenza?: string }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const toggleTask = createAction(
  '[Task] Toggle Task',
  props<{ id: string; nuovoStato: boolean }>()
);