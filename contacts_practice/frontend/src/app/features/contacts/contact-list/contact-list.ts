import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactState } from '../../../core/state/contact.state';

@Component({
  selector: 'app-contact-list',
  imports: [ CommonModule, RouterLink, FormsModule],
  templateUrl: './contact-list.html',
  styleUrl: '../../../app.css',
})
export class ContactList implements OnInit{
  contactState = inject(ContactState);

  searchTerm = '';
  // statusFilter = '';

  loadContacts(): void{
    this.contactState.loadContacts({
      search: this.searchTerm
    });
  }

  ngOnInit(): void{
    this.loadContacts();
  }

  get groupedContacts(){
    const groups: Record<string, any[]> = {};

    for (const contact of this.contactState.contacts()) {
      const letter = contact.name.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }

      groups[letter].push(contact);
    }

    // Convertimos a array ordenado
    return Object.keys(groups)
      .sort()
      .map(letter => ({
        letter,
        contacts: groups[letter],
    }));
  }

  prevPage(): void {
    const current = this.contactState.pagination().currentPage;
    if (current > 1) {
      this.contactState.loadContacts({
        search: this.searchTerm,
        page: current - 1
      });
    }
  }

  nextPage(): void {
    const { currentPage, lastPage } = this.contactState.pagination();
    if (currentPage < lastPage) {
      this.contactState.loadContacts({
        search: this.searchTerm,
        page: currentPage + 1
      });
    }
  }

  onSearch(): void{
    this.loadContacts();
  }
}
