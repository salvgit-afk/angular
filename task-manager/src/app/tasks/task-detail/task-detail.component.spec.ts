import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetail } from './task-detail.component';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';


describe('TaskDetail', () => {
  let component: TaskDetail;
  let fixture: ComponentFixture<TaskDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetail],
      providers: [provideRouter([]), provideMockStore({ initialState: { tasks: { tasks: [], loading: false, error: null } } })],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
