import { Routes } from '@angular/router';
import { TasksList } from './tasks/tasks-list/tasks-list.component';
import { TaskDetail } from './tasks/task-detail/task-detail.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksList },
  { path: 'tasks/:id', component: TaskDetail, canActivate: [authGuard] },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: '**', redirectTo: '/tasks' }
];