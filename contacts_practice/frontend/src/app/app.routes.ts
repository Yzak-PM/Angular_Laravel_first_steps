import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        pathMatch: 'full',
        loadComponent: () => import('./features/contacts/contact-list/contact-list')
        .then(m => m.ContactList)
    },
    {
        path: 'contacts/new',
        loadComponent: () => import('./features/contacts/contact-form/contact-form')
        .then(m => m.ContactForm)
    },
    {
        path: 'contacts/:id/edit',
        loadComponent: () => import('./features/contacts/contact-form/contact-form')
        .then(m => m.ContactForm)
    },
    {
        path: 'contacts/:id',
        loadComponent: () => import('./features/contacts/contact-detail/contact-detail')
        .then(m => m.ContactDetail)
    },
];
