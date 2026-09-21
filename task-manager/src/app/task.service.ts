import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BehaviorSubject, map, retry, catchError, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';



interface ApiTodo {
  id: number;
  title: string;
  completed: boolean;
}
export interface Task {
  id: string;
  titolo: string;
  completato: boolean;
  dataCreazione: Date;
  priorita?: 'bassa' | 'media' | 'alta';
  scadenza?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.taskSubject.asObservable();

  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/todos';


  loadTasks(): Observable<Task[]> {
    return this.http.get<ApiTodo[]>(this.url).pipe(
      retry(2),
      map(todos => todos.slice(0, 10).map(t => ({
        id: String(t.id),
        titolo: t.title,
        completato: t.completed,
        dataCreazione: new Date()
      }))),
      tap(tasks => {
        this.tasks = tasks;
        this.emit();
      }),
      catchError(err => {
        console.error('Errore nel caricamento task', err);
        return throwError(() => err);
      })
    );
  }

  private emit() {
    this.taskSubject.next(this.tasks);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  getByIdAsync(id: string): Observable<Task | undefined> {
    return of(this.getById(id)).pipe(delay(1000));
  }

  addTask(titolo: string, priorita?: Task['priorita'], scadenza?: string): void {
    if (!titolo.trim()) return; 
    this.http.post<ApiTodo>(this.url, {title: titolo, completed: false}).subscribe(() => {
      this.tasks.push({
        id: crypto.randomUUID(),
        titolo,
        completato: false,
        dataCreazione: new Date(),
        priorita,
        scadenza
      });
      this.emit();
    });
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.emit();
  }

  toggleTask(id: string, nuovoStato: boolean): void {
    const task = this.getById(id);
    if (task) task.completato = nuovoStato;
    this.emit();
  }
}