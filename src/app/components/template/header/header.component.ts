// Angular
import { Component, OnInit } from '@angular/core';

// Layout Services
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }
}
