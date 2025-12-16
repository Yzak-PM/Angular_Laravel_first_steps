import { Component, effect, inject, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactState } from '../../../core/state/contact.state';
import { OrganizationState } from '../../../core/state/organization.state';
import { CreateContactDto } from '../../../core/models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  contactState = inject(ContactState);
  organizationState = inject(OrganizationState);

  isEditMode = false;
  contactId: string | null = null;
  private hydrated = false;

  formData: CreateContactDto = {
    organization_id: '',
    first_name: '',
    last_name: '',
    email: '',
    title: '',
    department: '',
    phone: null,
    status: 'active',
    notes: ''
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
            organization_id: contact.organization_id,
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            title: contact.title,
            department: contact.department ?? '',
            phone: contact.phone ?? null,
            status: contact.status,
            notes: contact.notes ?? ''
          };

          this.hydrated = true; // 🔒 solo una vez
        }
      }
    );
  }

  ngOnInit(): void {
    this.organizationState.loadOrganizations({ per_page: 100 });

    this.contactId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.contactId;

    if (this.isEditMode && this.contactId) {
      this.contactState.loadContact(this.contactId);
    }

    const orgId = this.route.snapshot.queryParamMap.get('organization_id');
    if (orgId && !this.isEditMode) {
      this.formData.organization_id = orgId;
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
}
