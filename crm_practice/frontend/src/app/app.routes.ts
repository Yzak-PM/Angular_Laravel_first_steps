import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'organizations',
        pathMatch: 'full'
    },
    {
        path: 'organizations',
        loadComponent: () => import('./features/organizations/organization-list/organization-list')
        .then(m => m.OrganizationList)
    },
    {
        path: 'organizations/new',
        loadComponent: () => import('./features/organizations/organization-form/organization-form')
        .then(m => m.OrganizationForm)
    },
    {
        path: 'organizations/:id/edit',
        loadComponent: () => import('./features/organizations/organization-form/organization-form')
        .then(m => m.OrganizationForm)
    },
    {
        path: 'organizations/:id',
        loadComponent: () => import('./features/organizations/organization-detail/organization-detail')
        .then(m => m.OrganizationDetail)
    },
    {
        path: 'contacts',
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
    }
];