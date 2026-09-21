import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(selectTaskState, state => state.tasks);
export const selectLoading = createSelector(selectTaskState, state => state.loading);
export const selectError = createSelector(selectTaskState, state => state.error);
export const selectTaskById = (id: string) =>
  createSelector(selectAllTasks, tasks => tasks.find(t => t.id === id));