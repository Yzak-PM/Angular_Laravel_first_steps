import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Evita loop si ya estás en auth
        const url = router.url;
        const onAuthPage = url.startsWith('/auth');

        // Limpia local y manda a login (sin llamar /auth/logout)
        authService.forceLogoutLocalOnly();

        if (!onAuthPage) {
          router.navigate(['/auth/login'], { queryParams: { returnUrl: url } });
        }
      }

      return throwError(() => error);
    })
  );
};