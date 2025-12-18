import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Auth routes (guest only)
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' }, // 👈 default
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login').then(m => m.LoginComponent),
        title: 'Sign In',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then(m => m.RegisterComponent),
        title: 'Register',
      },
    ],
  },

  // Unauthorized page (pública)
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/unauthorized/unauthorized').then(m => m.UnauthorizedComponent),
    title: 'Unauthorized',
  },

  // Protected routes
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/layout').then(m => m.LayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'contacts' }, // 👈 default
      {
        path: 'contacts',
        loadChildren: () =>
          import('./features/contacts/contacts.routes').then(m => m.CONTACT_ROUTES),
        title: 'Contacts',
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
        title: 'Admin',
      },

      // Admin only route
      // {
      //   path: 'users',
      //   canActivate: [adminGuard],
      //   loadComponent: () =>
      //     import('./features/users/user-list/user-list.component').then(m => m.UserListComponent),
      //   title: 'Users'
      // },
    ],
  },

  // Fallback
  { path: '**', redirectTo: 'auth/login' },
];