import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrganizationState } from '../../../core/state/organization.state';
import { Organization, CreateOrganizationDto } from '../../../core/models/organization.model';

@Component({
  selector: 'app-organization-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './organization-form.html',
  styleUrl: './organization-form.css',
})
export class OrganizationForm implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  orgState = inject(OrganizationState);

  form: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  organizationId = signal<string | null> (null);
  parentOrganizations = signal<Organization[]>([]);
  preselectedParentId = signal<string | null>(null);

  constructor() {
    this.form = this.fb.group({
      parent_id: [''],
      name: ['', Validators.required],
      email: ['', Validators.email],
      type: [''],
      website: [''],
      phone: [''],
      status: ['active'],
      address: ['']
    });
  }

  ngOnInit(): void {
    // Load industries if not loaded
    // if (this.orgState.industries().length === 0) {
    //   this.orgState.loadIndustries();
    // }
    
    // Load parent organizations for dropdown
    this.loadParentOrganizations();
    
    // Check if editing
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.organizationId.set(id);
      this.loadOrganization(id);
    } else {
      // Check for parent_id in query params (for creating subsidiaries/branches)
      const parentId = this.route.snapshot.queryParamMap.get('parent_id');
      if (parentId) {
        this.preselectedParentId.set(parentId);
        this.form.patchValue({ parent_id: parentId });
      }
    }
  }

  private loadParentOrganizations(): void {
    // Load all organizations that can be parents (parent or subsidiary, not branches)
    // We need to make a separate API call and store the result
    this.orgState.loadOrganizations({ per_page: 100 });
    
    // Wait for organizations to load and filter for potential parents
    const checkLoaded = setInterval(() => {
      const orgs = this.orgState.organizations();
      if (orgs.length > 0 || !this.orgState.isLoading()) {
        // Filter out branches - only parent and subsidiary can be parents
        const potentialParents = orgs.filter(org => org.type !== 'branch');
        this.parentOrganizations.set(potentialParents);
        clearInterval(checkLoaded);
      }
    }, 100);
    
    // Clear interval after 5 seconds to avoid memory leak
    setTimeout(() => clearInterval(checkLoaded), 5000);
  }

  private loadOrganization(id: string): void {
    this.orgState.loadOrganization(id);
    
    // Subscribe to changes (in a real app, use effect() or computed())
    // For simplicity, we'll poll the state
    const checkLoaded = setInterval(() => {
      const org = this.orgState.selectedOrganization();
      if (org && org.id === id) {
        this.patchForm(org);
        clearInterval(checkLoaded);
      }
    }, 100);
  }

  private patchForm(org: Organization): void {
    this.form.patchValue({
      parent_id: org.parent?.id || '',
      name: org.name,
      // industry_id: org.industry?.id || '',
      // size: org.size || '',
      status: org.status,
      email: org.email || '',
      website: org.website || '',
      address: org.address || '',
      type: org.type || '',
      phone: org.phone || '',
      // phone_country_code: org.phone.country_code || '',
      // phone_number: org.phone.number || '',
      // address_data: {
      //   street: org.address?.street || '',
      //   city: org.address?.city || '',
      //   state: org.address?.state || '',
      //   postal_code: org.address?.postal_code || '',
      //   country: org.address?.country || ''
      // },
      // notes: org.notes || ''
    });
  }

  async onSubmit(): Promise<void> {
    console.log('Form submitted');
    if (this.form.invalid) return;
    
    this.isSubmitting.set(true);
    
    const formValue = this.form.value;
    const data: CreateOrganizationDto = {
      name: formValue.name,
      parent_id: formValue.parent_id || null,
      type: formValue.type || null,
      // industry_id: formValue.industry_id ? parseInt(formValue.industry_id) : null,
      // size: formValue.size || null,
      status: formValue.status || 'active',
      email: formValue.email || null,
      website: formValue.website || null,
      address: formValue.address || null, 
      phone: formValue.phone || null, 
      // phone_country_code: formValue.phone_country_code || null,
      // phone_number: formValue.phone_number || null,
      // address_data: this.cleanAddressData(formValue.address_data),
      // notes: formValue.notes || null
    };
    
    try {
      if (this.isEditMode()) {
        await this.orgState.updateOrganization(this.organizationId()!, data);
        this.router.navigate(['/organizations', this.organizationId()]);
      } else {
        const org = await this.orgState.createOrganization(data);
        this.router.navigate(['/organizations', org.id]);
      }
    } catch (error) {
      console.error('Failed to save organization:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private cleanAddressData(address: any): any {
    // Remove empty fields
    const cleaned: any = {};
    for (const key of Object.keys(address)) {
      if (address[key]) {
        cleaned[key] = address[key];
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : null;
  }
}