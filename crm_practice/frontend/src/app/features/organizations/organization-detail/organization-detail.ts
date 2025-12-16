import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { OrganizationState } from '../../../core/state/organization.state';

@Component({
  selector: 'app-organization-detail',
  standalone: true,
  imports: [ RouterLink, DatePipe, TitleCasePipe, CommonModule ],
  templateUrl: './organization-detail.html',
  styleUrl: './organization-detail.css',
})
export class OrganizationDetail implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  orgState = inject(OrganizationState);
  
  organization = computed(() => this.orgState.selectedOrganization());
  activeTab = signal<'details' | 'subsidiaries' | 'contacts'>('details');
  
  tabs = [
    { id: 'details' as const, label: 'Details' },
    { id: 'subsidiaries' as const, label: 'Subsidiaries & Branches' },
    { id: 'contacts' as const, label: 'Contacts' },
  ];
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orgState.loadOrganization(id);
    }
  }
  
  async deleteOrganization(): Promise<void> {
    if (!this.organization()) return;
    
    if (confirm(`Are you sure you want to delete "${this.organization()!.name}"? This action cannot be undone.`)) {
      try {
        await this.orgState.deleteOrganization(this.organization()!.id);
        this.router.navigate(['/organizations']);
      } catch (error) {
        alert('Failed to delete organization. It may have subsidiaries or associated data.');
      }
    }
  }
}
