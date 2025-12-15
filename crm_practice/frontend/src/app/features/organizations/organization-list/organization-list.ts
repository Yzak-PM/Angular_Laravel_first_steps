import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrganizationState } from '../../../core/state/organization.state';

@Component({
  selector: 'app-organization-list',
  imports: [ CommonModule, RouterLink, FormsModule ],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.css',
})

export class OrganizationList implements OnInit {
  orgState = inject(OrganizationState);

  searchTerm = '';
  typeFilter = '';

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.orgState.loadOrganizations({
      search: this.searchTerm,
      type: this.typeFilter
    });
  }

  onSearch(): void {
    this.loadOrganizations();
  }

  prevPage(): void {
    const current = this.orgState.pagination().currentPage;
    if (current > 1) {
      this.orgState.loadOrganizations({
        search: this.searchTerm,
        type: this.typeFilter,
        page: current - 1
      });
    }
  }

  nextPage(): void {
    const { currentPage, lastPage } = this.orgState.pagination();
    if (currentPage < lastPage) {
      this.orgState.loadOrganizations({
        search: this.searchTerm,
        type: this.typeFilter,
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