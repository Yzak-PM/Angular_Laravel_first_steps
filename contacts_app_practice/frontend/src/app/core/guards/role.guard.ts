import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
* Factory for role-based guards.
* Usage: canActivate: [roleGuard(['admin', 'manager'])]
*/
export function roleGuard(allowedRoles: string[]): CanActivateFn {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (!authService.isAuthenticated()) {
            router.navigate(['/auth/login']);
            return false;
        }

        if (authService.hasAnyRole(allowedRoles)) {
            return true;
        }

        router.navigate(['/unauthorized']);
        return false;
    };
}

/**
* Only allows admin users.
*/
export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login']);
        return false;
    }

    if (authService.isAdmin()) {
        return true;
    }
    
    router.navigate(['/unauthorized']);
    return false;
};