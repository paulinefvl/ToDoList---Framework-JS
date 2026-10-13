import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task';

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
  editId = '';
  editTitle = '';
  editDescription = '';
  editDueDate = '';
  filter = 'toutes';
  search = '';

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

  supprTask(id: string) {
    if (confirm('Supprimer cette tâche ?')) {
      this.taskService.remove(id);
    }
  }

  today() {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  invalideDate(): boolean {
    return this.dueDate !== '' && this.dueDate < this.today();
  }

  editTask(task : Task) {
    this.editId = task.id;
    this.editTitle = task.title;
    this.editDescription = task.description ?? '';
    this.editDueDate = task.dueDate ?? '';
  }

  updateTask() {
    this.taskService.update(this.editId, {
      title : this.editTitle.trim(),
      description : this.editDescription.trim(),
      dueDate : this.editDueDate || undefined,
    });
    this.editId = '';
  }

  cancelEdit() {
    this.editId = '';
  }

  invalideEditDate(): boolean {
  return this.editDueDate !== '' && this.editDueDate < this.today();
  }

  filterTasks(): Task[] {
  const q = this.search.trim().toLowerCase();

  return this.taskService.tasks()
    .filter(t => this.filter === 'toutes' || (this.filter === 'faites' && t.done) || (this.filter === 'non terminées' && !t.done))
    .filter(t => t.title.toLowerCase().includes(q))
    .sort((a, b) =>
      (a.dueDate ?? '9999-12-31').localeCompare(b.dueDate ?? '9999-12-31') || a.title.localeCompare(b.title));
}


}
