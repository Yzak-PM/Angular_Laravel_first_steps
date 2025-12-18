import { Component, inject, OnInit, signal } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RolePermissionState } from '../../../../core/state/role-permission.state';

@Component({
  selector: 'app-contacts-permission-config',
  standalone: true,
  imports: [LowerCasePipe],
  templateUrl: './contact-permission-config.html',
  styleUrl: '../../../../app.css'
})
export class ContactsPermissionConfigComponent implements OnInit {
  permState = inject(RolePermissionState);
  selectedRole = signal<string>('admin');

  ngOnInit(): void {
    this.permState.loadConfig();
  }

  hasPermission(action: string): boolean {
    return this.permState.hasPermission(this.selectedRole(), 'contacts', action);
  }

  togglePermission(action: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.permState.updatePermission(this.selectedRole(), 'contacts', action, checkbox.checked);
  }

  toggleAll(allowed: boolean): void {
    const role = this.selectedRole();
    const actions = this.permState.getActionsForModule('contacts');
    const permissions: Record<string, Record<string, boolean>> = { contacts: {} };

    for (const action of actions) {
      permissions['contacts'][action.key] = allowed;
    }

    this.permState.updateRolePermissions(role, permissions);
  }

  confirmReset(): void {
    if (confirm('Are you sure you want to reset all permissions to their default values? This cannot be undone.')) {
      this.permState.resetToDefaults();
    }
  }
}