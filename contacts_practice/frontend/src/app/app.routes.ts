import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard, adminGuard } from './core/guards/role.guard';

export const routes: Routes = [
    // Auth routes (guest only)
    {
        path: 'auth',
        canActivate: [],
        children: [
            // {
            //     path: 'login',
            //     loadComponent: () => import('./features/auth/login/login.component')
            //     .then(m => m.LoginComponent)
            // },
            // {
            //     path: 'register',
            //     loadComponent: () => import('./features/auth/register/register.component')
            //     .then(m => m.RegisterComponent)
            // }
        ]
    },
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
    //& Admin only route
    // {
    //     path: 'users',
    //     canActivate: [adminGuard],
    //     loadComponent: () => import('./features/users/user-list/user-list.component')
    //         .then(m => m.UserListComponent)
    // },
    //& Admin/Manager route
    // {
    //     path: 'reports',
    //     canActivate: [roleGuard(['admin', 'manager'])],
    //     loadComponent: () => import('./features/reports/reports.component')
    //         .then(m => m.ReportsComponent)
    // },
    //& Unauthorized page
    // {
    //     path: 'unauthorized',
    //     loadComponent: () => import('./features/auth/unauthorized/unauthorized.component')
    //     .then(m => m.UnauthorizedComponent)
    // }
];
