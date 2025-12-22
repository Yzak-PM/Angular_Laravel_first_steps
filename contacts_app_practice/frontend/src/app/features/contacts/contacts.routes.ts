import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';


export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./contact-list/contact-list')
      .then(m => m.ContactList),
    title: 'Contacts'
  },
  {
    path: 'new',
    canMatch: [permissionGuard('contacts', 'create')],
    loadComponent: () =>
      import('./contact-form/contact-form')
        .then(m => m.ContactForm),
    title: 'New Contact'
  },
  {
    path: ':id',
    canMatch: [permissionGuard('contacts', 'view')],
    loadComponent: () =>
      import('./contact-detail/contact-detail')
        .then(m => m.ContactDetail),
    title: 'Contact Details'
  },
  {
    path: ':id/edit',
    canMatch: [permissionGuard('contacts', 'update')],
    loadComponent: () =>
      import('./contact-form/contact-form')
        .then(m => m.ContactForm),
    title: 'Edit Contact'
  }

];