import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/contact-list/contact-list')
        .then(m => m.ContactList)
    },
];
