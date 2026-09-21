import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { TaskItem } from '../task-item/task-item.component';
import { Task } from '../../task.service';
import { debounceTime, startWith, switchMap, map } from 'rxjs';
import { loadTasks, addTask, deleteTask, toggleTask } from '../../state/task/task.actions';
import { selectAllTasks, selectLoading, selectError } from '../../state/task/task.selectors';
import { FiltraTaskPipe, FiltroTask } from '../../filtra-task.pipe';

function dataFuturaValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  return new Date(control.value) < oggi ? { dataPassata: true } : null;
}

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskItem, FiltraTaskPipe],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksList implements OnInit {
  private store = inject(Store);

  loading = toSignal(this.store.select(selectLoading), { initialValue: true });
  error = toSignal(this.store.select(selectError), { initialValue: null });
  private allTasks = toSignal(this.store.select(selectAllTasks), { initialValue: [] as Task[] });

  ngOnInit() {
    this.store.dispatch(loadTasks());
  }

  searchControl = new FormControl('');

  filteredTasks$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    switchMap(term =>
      this.store.select(selectAllTasks).pipe(
        map(tasks => tasks.filter(t =>
          t.titolo.toLowerCase().includes((term ?? '').toLowerCase())
        ))
      )
    )
  );

  private fb = inject(FormBuilder);

  taskForm = this.fb.group({
    titolo: ['', [Validators.required, Validators.minLength(3)]],
    priorita: ['media', Validators.required],
    scadenza: ['', dataFuturaValidator]
  });
  filtro: FiltroTask = 'tutti';

  get tasks() {
    return this.allTasks();
  }

  aggiungi() {
    if (this.taskForm.invalid) return;
    const { titolo, priorita, scadenza } = this.taskForm.value;
    this.store.dispatch(addTask({ titolo: titolo!, priorita: priorita as Task['priorita'], scadenza: scadenza || undefined }));
    this.taskForm.reset({ priorita: 'media' });
  }

  elimina(id: string) {
    this.store.dispatch(deleteTask({ id }));
  }

  gestisciToggle(id: string, nuovoStato: boolean) {
    this.store.dispatch(toggleTask({ id, nuovoStato }));
  }
}