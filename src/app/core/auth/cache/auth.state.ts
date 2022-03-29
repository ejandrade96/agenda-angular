// Angular
import { Injectable } from "@angular/core";

// RxJS
import { BehaviorSubject, Observable } from "rxjs";

// States
import { StateBase } from "src/app/shared/states/base.state";

@Injectable()
export class AuthState extends StateBase {
    private loggedIn = new BehaviorSubject<boolean>(false);

    getIsLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    setIsLoggedIn(valor: boolean) {
        this.loggedIn.next(valor);
    }
}