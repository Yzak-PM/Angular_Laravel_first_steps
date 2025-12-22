import { inject } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionState, PermissionMatrix } from '../state/permission.state';

type ModuleName = keyof PermissionMatrix;
type ActionName<M extends ModuleName> = keyof PermissionMatrix[M];

export function permissionGuard<M extends ModuleName>(
  module: M,
  action: ActionName<M>
): CanMatchFn {
  return () => {
    const authService = inject(AuthService);
    const permissionState = inject(PermissionState);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/auth/login']);
    }

    // 🚨 IMPORTANTE: NO devolver false
    if (!permissionState.isLoaded()) {
      permissionState.loadPermissions();
      return router.createUrlTree(['/unauthorized']);
    }

    if (permissionState.can(module, action)) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  };
}
