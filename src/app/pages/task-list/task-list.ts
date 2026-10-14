import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  readonly taskService = inject(TaskService);

  // Ces propriétés sont liées aux champs du formulaire via ngModel.
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
    // La validation est répétée ici, en plus de l'état disabled du bouton,
    // afin de ne pas dépendre uniquement du comportement de l'interface.
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
    // Le format YYYY-MM-DD permet une comparaison lexicographique fiable entre dates.
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  invalideDate(): boolean {
    // Une chaîne vide signifie qu'aucune échéance facultative n'a été renseignée.
    return this.dueDate !== '' && this.dueDate < this.today();
  }

  editTask(task: Task) {
    this.editId = task.id;
    this.editTitle = task.title;
    this.editDescription = task.description ?? '';
    this.editDueDate = task.dueDate ?? '';
  }

  updateTask() {
    this.taskService.update(this.editId, {
      title: this.editTitle.trim(),
      description: this.editDescription.trim(),
      dueDate: this.editDueDate || undefined,
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
    // Les filtres sont appliqués dans cet ordre pour produire la liste affichée :
    // statut, recherche, puis échéance et titre comme critères de tri secondaires.
    return this.taskService.tasks()
      .filter(t => this.filter === 'toutes' || (this.filter === 'faites' && t.done) || (this.filter === 'non terminées' && !t.done))
      .filter(t => t.title.toLowerCase().includes(q))
      .sort((a, b) =>
        (a.dueDate ?? '9999-12-31').localeCompare(b.dueDate ?? '9999-12-31') || a.title.localeCompare(b.title));
  }
}