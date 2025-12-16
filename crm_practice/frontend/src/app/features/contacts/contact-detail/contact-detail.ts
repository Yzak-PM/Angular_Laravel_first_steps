import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ContactState } from '../../../core/state/contact.state';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  contactState = inject(ContactState);

  isDeleting = signal(false);

  contact = computed(() => this.contactState.selectedContact());

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.contactState.loadContact(id);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
  
  async deleteContact(): Promise<void> {
    const contact = this.contact();
    if (!contact) return;
    
    const confirmed = confirm(`Are you sure you want to delete ${contact.first_name} ${contact.last_name}? This action cannot be undone.`);
    if (!confirmed) return;
    
    this.isDeleting.set(true);
    try {
      await this.contactState.deleteContact(contact.id);
      this.router.navigate(['/contacts']);
    } catch (error) {
      console.error('Failed to delete contact:', error);
    } finally {
      this.isDeleting.set(false);
    }
  }
  
}
