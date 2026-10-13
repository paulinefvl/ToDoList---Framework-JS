import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly taskService = inject(TaskService);

  title = '';
  description = '';
  dueDate = '';

  addTask() {
    if (this.title.trim().length < 3) {
      alert('Le titre doit contenir au moins 3 caractères.');
      return;
    }
    this.taskService.add({ title: this.title.trim(), description: this.description.trim(), dueDate: this.dueDate || undefined });
    this.title = '';
    this.description = '';
    this.dueDate = '';

  }

}
