import { Routes } from '@angular/router';
import { canCreateContactsGuard, canUpdateContactsGuard } from '../../core/guards/permission.guard';


export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./contact-list/contact-list')
      .then(m => m.ContactList),
    title: 'Contacts'
  },
  {
    path: 'new',
    canActivate: [canCreateContactsGuard],
    loadComponent: () => import('./contact-form/contact-form')
      .then(m => m.ContactForm),
    title: 'New Contact'
  },
  {
    path: ':id',
    loadComponent: () => import('./contact-detail/contact-detail')
      .then(m => m.ContactDetail),
    title: 'Contact Details'
  },
  {
    path: ':id/edit',
    canActivate: [canUpdateContactsGuard],
    loadComponent: () => import('./contact-form/contact-form')
      .then(m => m.ContactForm),
    title: 'Edit Contact'
  }

];