import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ContactState } from '../../../core/state/contact.state';
import { CreateContactDto } from '../../../core/models/contact.model';
import { PermissionState } from '../../../core/state/permission.state';

@Component({
  selector: 'app-contact-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: '../../../app.css',
})
export class ContactForm implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  contactState = inject(ContactState);
  permissionState = inject(PermissionState);

  contact = computed(() => this.contactState.selectedContact());
  isDeleting = signal(false);
  isDeleteModalOpen = false;
  isEditMode = false;
  contactId: string | null = null;
  private hydrated = false;

  formData: CreateContactDto = {
    name: '',
    mobile: '',
    email: '',
    company: ''
  };

  constructor() {
    // ✅ EFFECT SIEMPRE DEFINIDO
    effect(
      () => {
        const contact = this.contactState.selectedContact();

        if (
          !this.hydrated &&
          this.isEditMode &&
          contact &&
          contact.id === this.contactId
        ) {
          this.formData = {
            name: contact.name,
            mobile: contact.mobile,
            email: contact.email,
            company: contact.company
          };

          this.hydrated = true; // 🔒 solo una vez
        }
      }
    );
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.contactId;

    if (this.isEditMode && this.contactId) {
      this.contactState.loadContact(this.contactId);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.isEditMode && this.contactId) {
      await this.contactState.updateContact(this.contactId, this.formData);
    } else {
      await this.contactState.createContact(this.formData);
    }

    this.router.navigate(['/contacts']);
  }

  async deleteContact(): Promise<void> {
    const contact = this.contact();
    if (!contact) return;
    
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