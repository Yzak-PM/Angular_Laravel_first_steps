import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/role.guard';


export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./contact-list/contact-list')
      .then(m => m.ContactList),
    title: 'Contacts'
  },
  {
    path: 'new',
    canActivate: [adminGuard],
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
    canActivate: [adminGuard],
    loadComponent: () => import('./contact-form/contact-form')
      .then(m => m.ContactForm),
    title: 'Edit Contact'
  }

];