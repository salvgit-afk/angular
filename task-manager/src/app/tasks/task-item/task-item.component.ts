import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TroncaTestoPipe } from '../../tronca-testo.pipe';
import { Task } from '../../task.service';



@Component({
  selector: 'app-task-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, TroncaTestoPipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItem {
  @Input({ required: true }) task!: Task;
  @Output() delete = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<boolean>();

  onToggleChange(event: Event) {
    this.toggle.emit((event.target as HTMLInputElement).checked);
  }

  onDeleteClick() {
    this.delete.emit();
  }
}