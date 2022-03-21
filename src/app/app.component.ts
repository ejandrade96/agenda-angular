// Angular
import { Component, OnInit } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';

// Layout Services
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }
}
