import { FiltraTaskPipe } from './filtra-task.pipe';
import { Task } from './task.service';

describe('FiltraTaskPipe', () => {
  const pipe = new FiltraTaskPipe();
  const tasks: Task[] = [
    { id: '1', titolo: 'A', completato: true, dataCreazione: new Date() },
    { id: '2', titolo: 'B', completato: false, dataCreazione: new Date() },
  ];

  it('con "tutti" restituisce tutti i task', () => {
    expect(pipe.transform(tasks, 'tutti')).toEqual(tasks);
  });

  it('con "completati" restituisce solo i completati', () => {
    const result = pipe.transform(tasks, 'completati');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
  });

  it('con "da-fare" restituisce solo quelli non completati', () => {
    const result = pipe.transform(tasks, 'da-fare');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });
});