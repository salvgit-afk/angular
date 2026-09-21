import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadTasks } from '../../state/task/task.actions';
import { selectTaskById, selectLoading, selectError } from '../../state/task/task.selectors';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  private id = this.route.snapshot.params['id'];

  loading = toSignal(this.store.select(selectLoading), { initialValue: true });
  error = toSignal(this.store.select(selectError), { initialValue: null });
  task = toSignal(this.store.select(selectTaskById(this.id)), { initialValue: undefined });

  ngOnInit() {
    this.store.dispatch(loadTasks());
  }
}