// Angular
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// RxJS
import { Observable, of } from 'rxjs';

// Layout Services
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService,
        private authService: AuthService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(this.canAccess());
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

    private canAccess(): boolean {
        let tokenIsValid = this.validateToken(this.tokenStorageService.getAccessToken());
        let isLoggedIn = this.isLoggedIn();

        if (tokenIsValid && isLoggedIn) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

    private isLoggedIn(): boolean {
        var loggedIn: boolean;
        this.authService.getIsLoggedIn().subscribe(x => loggedIn = x);
        return loggedIn;
    }

    private validateToken(token: string): boolean {
        try {
            if (!token || token.includes('token')) {
                return false;
            }
            return true;
        } catch {
            this.tokenStorageService.clear();
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
