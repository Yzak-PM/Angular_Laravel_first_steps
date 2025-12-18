import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PermissionState } from '../../core/state/permission.state';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
})
export class LayoutComponent {
  sidebarOpen = signal(false);
  authService = inject(AuthService);
  CurrentUser = this.authService.user;
  permissionState = inject(PermissionState);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }
  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  onLogout() {
    this.authService.logout();
  }
}