import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactState } from '../../../core/state/contact.state';

@Component({
  selector: 'app-organization-list',
  imports: [ CommonModule, RouterLink, FormsModule ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})

export class ContactList implements OnInit {
  orgState = inject(ContactState);

  searchTerm = '';
  statusFilter = '';

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.orgState.loadContacts({
      search: this.searchTerm,
      status: this.statusFilter
    });
  }

  onSearch(): void {
    this.loadContacts();
  }

  prevPage(): void {
    const current = this.orgState.pagination().currentPage;
    if (current > 1) {
      this.orgState.loadContacts({
        search: this.searchTerm,
        status: this.statusFilter,
        page: current - 1
      });
    }
  }

  nextPage(): void {
    const { currentPage, lastPage } = this.orgState.pagination();
    if (currentPage < lastPage) {
      this.orgState.loadContacts({
        search: this.searchTerm,
        status: this.statusFilter,
        page: currentPage + 1
      });
    }
  }

  getStatusClass(status: string): string {
    return status === 'active'
      ? 'px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full'
      : 'px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full';
  }
}