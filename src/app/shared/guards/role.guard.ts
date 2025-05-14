import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FbAuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private fbAuth: FbAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRolesMap: Map<string, boolean> = new Map();
    this.fbAuth.userData.roles.forEach((role: string) => {
      userRolesMap.set(role, true);
    });
    if (route.data.roles.length !== this.fbAuth.userData.roles.length) {
      this.router.navigate(['/landing']);
      return false;
    }

    const rolesMatched = (route.data.roles as string[]).every(
      (role: string) => {
        return userRolesMap.has(role);
      }
    );
    if (!rolesMatched) {
      this.router.navigate(['/landing']);
      return false;
    }
    return true;
  }
}
