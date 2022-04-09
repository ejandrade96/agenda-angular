// Angular
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// RxJS
import { Observable, of } from 'rxjs';

// Layout Services
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(this.validateToken(this.tokenStorageService.getAccessToken()));
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    private validateToken(token: string): boolean {
        try {
            if (!token || token.includes('token')) {
                this.router.navigateByUrl('/auth/login');
                return false;
            }
            return true;
        } catch {
            this.tokenStorageService.clear();
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
}
