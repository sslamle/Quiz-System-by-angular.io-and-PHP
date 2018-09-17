import { CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

import { AuthService } from './auth.service';

export class CanActivateViaAuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot):Observable<boolean>|Promise<boolean>|boolean {   
    if (route.data.permissions) {
      let result = new ReplaySubject<boolean>(1);
      this.authService.hasPermissions(route.data.permissions)
      .subscribe(userCan => {
        result.next(userCan);
        if (!userCan) {
          this.authService.goToLogin();
        }
      });
      return result;
    } else {
      let isLoggedIn = this.authService.isLoggedIn();
      if (isLoggedIn) return true;
      
      // Redirect to login page if not login
      this.authService.goToLogin();
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(route);
  }
}