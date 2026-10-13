import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  readonly taskService = inject(TaskService);
}