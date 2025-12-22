import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionState, PermissionMatrix } from '../state/permission.state';

type ModuleName = keyof PermissionMatrix;
type ActionName<M extends ModuleName> = keyof PermissionMatrix[M];

/**
 * Factory for permission-based guards.
 * Uses the dynamic permission system loaded from the backend.
 * 
 * Usage: canActivate: [permissionGuard('contacts', 'create')]
 */
export function permissionGuard<M extends ModuleName>(
    module: M,
    action: ActionName<M>
): CanActivateFn {
    return () => {
        const authService = inject(AuthService);
        const permissionState = inject(PermissionState);
        const router = inject(Router);

        // Check authentication first
        if (!authService.isAuthenticated()) {
            router.navigate(['/auth/login']);
            return false;
        }

        // Wait for permissions to load if not yet loaded
        if (!permissionState.isLoaded()) {
            permissionState.loadPermissions();
            return false;
        }

        // Check specific permission
        if (permissionState.can(module, action)) {
            return true;
        }

        router.navigate(['/unauthorized']);
        return false;
    };
}

/**
 * Guard that allows access if user can create contacts.
 */
export const canCreateContactsGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const permissionState = inject(PermissionState);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login']);
        return false;
    }

    // If permissions loaded and user can create
    if (permissionState.isLoaded() && permissionState.canCreateContacts()) {
        return true;
    }

    // If permissions not loaded yet, check role directly as fallback
    // (admin, manager, sales_rep can all create contacts by default)
    if (!permissionState.isLoaded()) {
        const user = authService.user();
        if (user && ['admin', 'manager', 'sales_rep'].includes(user.role)) {
            return true;
        }
    }

    router.navigate(['/unauthorized']);
    return false;
};

/**
 * Guard that allows access if user can update contacts.
 */
export const canUpdateContactsGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const permissionState = inject(PermissionState);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login']);
        return false;
    }

    // If permissions loaded and user can update
    if (permissionState.isLoaded() && permissionState.canUpdateContacts()) {
        return true;
    }

    // If permissions not loaded yet, check role directly as fallback
    // (admin, manager, sales_rep can all update contacts by default)
    if (!permissionState.isLoaded()) {
        const user = authService.user();
        if (user && ['admin', 'manager', 'sales_rep'].includes(user.role)) {
            return true;
        }
    }

    router.navigate(['/unauthorized']);
    return false;
};

