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
    // {
    //     path: 'organizations/:id',
    //     loadComponent: () => import('./features/organizations/organization-detail/organization-detail')
    //     .then(m => m.OrganizationDetailComponent)
    // },
    // {
    //     path: 'organizations/:id/edit',
    //     loadComponent: () => import('./features/organizations/organization-form/organization-form')
    //     .then(m => m.OrganizationFormComponent)
    // },
    {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/contact-list/contact-list')
        .then(m => m.ContactList)
    },
];