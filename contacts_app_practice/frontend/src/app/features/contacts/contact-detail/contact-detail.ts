import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactState } from '../../../core/state/contact.state';
import { CommonModule } from '@angular/common';
import { PermissionState } from '../../../core/state/permission.state';

@Component({
  selector: 'app-contact-detail',
  imports: [ CommonModule, RouterLink],
  templateUrl: './contact-detail.html',
  styleUrl: '../../../app.css',
})
export class ContactDetail implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  contactState = inject(ContactState);
  permissionState = inject(PermissionState);

  contact = computed(() => this.contactState.selectedContact());

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.contactState.loadContact(id);
    }
  }
}
