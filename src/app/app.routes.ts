import { Routes } from '@angular/router';
import { TaskList } from './pages/task-list/task-list';
import { Stats } from './pages/stats/stats';

export const routes: Routes = [
  // La page de liste est la page d'accueil de l'application.
  { path: '', component: TaskList },
  { path: 'stats', component: Stats },
];