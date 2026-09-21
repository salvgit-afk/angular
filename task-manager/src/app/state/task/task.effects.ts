import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TaskService } from '../../task.service';
import { loadTasks, loadTasksSuccess, loadTasksFailure } from './task.actions';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        this.taskService.loadTasks().pipe(
          map(tasks => loadTasksSuccess({ tasks })),
          catchError(err => of(loadTasksFailure({ error: err.message })))
        )
      )
    )
  );
}