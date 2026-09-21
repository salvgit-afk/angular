import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.service';

export type FiltroTask = 'tutti' | 'completati' | 'da-fare';

@Pipe({
  name: 'filtraTask',
  standalone: true,
  pure: true
})
export class FiltraTaskPipe implements PipeTransform {
  transform(tasks: Task[], filtro: FiltroTask): Task[] {
    if (filtro === 'tutti') return tasks;
    return tasks.filter(t => t.completato === (filtro === 'completati'));
  }
}