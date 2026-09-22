import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, retry, catchError, throwError } from 'rxjs';

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
      catchError(err => {
        console.error('Errore nel caricamento task', err);
        return throwError(() => err);
      })
    );
  }
}