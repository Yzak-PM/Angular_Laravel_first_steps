import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
/**
* Protects routes requiring authentication.
*/
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthenticated()) {
        return true;
    }

    router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
    });
    
    return false;
};
/**
* Prevents authenticated users from accessing auth pages.
*/
export const guestGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        return true;
    }

    router.navigate(['/dashboard']);
    return false;
};