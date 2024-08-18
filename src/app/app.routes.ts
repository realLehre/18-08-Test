import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'add-contact', pathMatch: 'full'},

    {path: 'add-contact', loadComponent: () => import('./add-contact/add-contact.component').then(c => c.AddContactComponent)},{path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)},
];
