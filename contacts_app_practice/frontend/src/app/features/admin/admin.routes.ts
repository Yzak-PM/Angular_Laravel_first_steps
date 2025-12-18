import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/role.guard';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    // {
    //     path: 'users',
    //     loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent),
    //     canActivate: [adminGuard],
    //     title: 'User Management | Entheo Nexus'
    // },
   {
    path: 'permissions/contacts',
    loadComponent: () =>
      import('./permissions/contact-permission-config/contact-permission-config').then(m => m.ContactsPermissionConfigComponent),
    canActivate: [adminGuard],
    title: 'Contacts Permissions | Entheo Nexus',
  },
]; 
