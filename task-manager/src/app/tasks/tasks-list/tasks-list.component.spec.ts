import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksList } from './tasks-list.component';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';



describe('TasksList', () => {
  let component: TasksList;
  let fixture: ComponentFixture<TasksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksList],
      providers: [provideRouter([]), provideMockStore({ initialState: { tasks: { tasks: [], loading: false, error: null } } })],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
