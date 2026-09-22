import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const url = 'https://jsonplaceholder.typicode.com/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('dovrebbe caricare e mappare i task dalla API', () => {
    const mockTodos = [
      { id: 1, title: 'Primo task', completed: false },
      { id: 2, title: 'Secondo task', completed: true },
    ];

    service.loadTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks[0].titolo).toBe('Primo task');
      expect(tasks[0].completato).toBe(false);
      expect(tasks[1].completato).toBe(true);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('dovrebbe limitare il risultato a 10 task anche se l\'API ne restituisce di più', () => {
    const mockTodos = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1, title: `Task ${i + 1}`, completed: false
    }));

    service.loadTasks().subscribe(tasks => {
      expect(tasks.length).toBe(10);
    });

    httpMock.expectOne(url).flush(mockTodos);
  });

  it('dovrebbe propagare un errore dopo i retry falliti', () => {
    service.loadTasks().subscribe({
      next: () => expect.unreachable('non doveva arrivare qui'),
      error: (err) => expect(err).toBeTruthy()
    });

    // 1 richiesta originale + 2 retry = 3 richieste totali
    for (let i = 0; i < 3; i++) {
      httpMock.expectOne(url).flush('errore simulato', { status: 500, statusText: 'Server Error' });
    }
  });
});