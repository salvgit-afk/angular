import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { vi } from 'vitest';
import { TasksList } from './tasks-list.component';
import { loadTasks, addTask, deleteTask, toggleTask } from '../../state/task/task.actions';

describe('TasksList', () => {
  let component: TasksList;
  let fixture: ComponentFixture<TasksList>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksList],
      providers: [provideRouter([]), provideMockStore({ initialState: { tasks: { tasks: [], loading: false, error: null } } })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    vi.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(TasksList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe dispatchare loadTasks al ngOnInit', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });

  it('elimina() dovrebbe dispatchare deleteTask con l\'id giusto', () => {
    component.elimina('42');
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ id: '42' }));
  });

  it('gestisciToggle() dovrebbe dispatchare toggleTask', () => {
    component.gestisciToggle('7', true);
    expect(store.dispatch).toHaveBeenCalledWith(toggleTask({ id: '7', nuovoStato: true }));
  });

  it('aggiungi() con form non valido non dovrebbe dispatchare addTask', () => {
    component.taskForm.patchValue({ titolo: '' });
    component.aggiungi();
    expect(store.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: addTask.type }));
  });

  it('aggiungi() con form valido dovrebbe dispatchare addTask', () => {
    component.taskForm.patchValue({ titolo: 'Nuovo task', priorita: 'alta' });
    component.aggiungi();
    expect(store.dispatch).toHaveBeenCalledWith(addTask({ titolo: 'Nuovo task', priorita: 'alta', scadenza: undefined }));
  });
});