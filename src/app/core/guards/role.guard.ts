import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const expectedRoles = route.data['roles'] as string[];
  const userRole = authService.getRole();

  if (authService.isAuthenticated() && expectedRoles.includes(userRole || '')) {
    return true;
  }

  // Redirect to their default dashboard based on role, or auth
  if (!userRole) return router.parseUrl('/auth');
  
  if (userRole === 'ADMIN') return router.parseUrl('/admin/equipe');
  if (userRole === 'ANALYST') return router.parseUrl('/analista/painel');
  return router.parseUrl('/cliente/painel');
};
