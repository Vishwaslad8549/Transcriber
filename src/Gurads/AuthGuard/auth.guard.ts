import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () =>
  inject(AuthService).isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
