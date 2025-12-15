import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrganizationState } from '../../../core/state/organization.state';

@Component({
  selector: 'app-organization-form',
  imports: [],
  templateUrl: './organization-form.html',
  styleUrl: './organization-form.css',
})
export class OrganizationForm {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  orgState = inject(OrganizationState);

  form: FormGroup;
  isEditMode = signal(false);-
  isSubmitting = signal(false);
  organizationId = signal<string | null> (null);
}
