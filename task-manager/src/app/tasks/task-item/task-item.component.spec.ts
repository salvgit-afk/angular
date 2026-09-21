import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TaskItem } from './task-item.component';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItem],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {
      id: '1', titolo: 'Test', completato: false, dataCreazione: new Date()
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});