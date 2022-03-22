// Angular
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

// RxJS
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';

// Models
import { User } from 'src/app/models/user.model';
import { AccessData } from '../models/access-data';

// Layout Services
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    public onLoginErrorEvent = new EventEmitter<any>();
    API_ENDPOINT_LOGIN = '/login';

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) { }

    /**
     * Submit login request
     * @param {User} user
     * @returns {Observable<any>}
     */
    login(user: User): Observable<any> {
        const url = this.API_ENDPOINT_LOGIN;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        const httpParams = new HttpParams()
            .set('login', user.username)
            .set('senha', user.password);

        return this.http.post<AccessData>(url, httpParams, httpOptions).pipe(
            map((result: any) => {
                if (result.token) {
                    this.loggedIn.next(true);
                    this.tokenStorage.setNome(result.nome);
                    this.tokenStorage.setAccessToken(result.token);
                }
                return result;
            }),
            catchError(
                this.handleError('login', [])
            )
        );
    }

    /**
     * Logout
     */
    public logout(refresh?: boolean): void {
        this.loggedIn.next(false);
        this.tokenStorage.clear();
        if (refresh) {
            this.router.navigate(['/login']);
        }
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            this.onLoginErrorEvent.emit(error);
            // Let the app keep running by returning an empty result.
            return from(result);
        };
    }
}
