import { CanActivateFn } from '@angular/router';

export const productosGuard: CanActivateFn = (route, state) => {
   return localStorage.getItem('login') == 'true';
};
