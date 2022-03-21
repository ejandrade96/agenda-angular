// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// RxJS
import { tap } from 'rxjs/operators';

// Layout Services
import { MessageService } from '../../../shared/services/message.service';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    private formSubmitAttempt: boolean;
    private returnUrl: any;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initLoginForm();

        this.route.queryParams.subscribe(params => {
            this.returnUrl = params['returnUrl'] || '/';
        });
    }

    ngOnDestroy(): void {
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            user: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ])
            ],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ]
        });
    }

    isFieldInvalid(field: string): boolean {
        return (
            (this.loginForm.get(field).invalid && this.loginForm.get(field).touched) ||
            (this.loginForm.get(field).untouched && this.formSubmitAttempt)
        );
    }

    /**
     * Form Submit
     */
    onSubmit(): void {
        this.formSubmitAttempt = true;
        const controls = this.loginForm.controls;
        if (this.loginForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            this.messageService.showMessage(MessageType.Warning, 'Usuário e senha devem ser informados', {});
            return;
        }

        const authData = {
            username: controls['user'].value,
            password: controls['password'].value
        };

        this.authService
            .login(authData)
            .pipe(
                tap(user => {
                    if (user && user.token) {
                        this.router.navigateByUrl(this.returnUrl);
                    } else {
                        this.messageService.showMessage(MessageType.Error, 'Usuário ou senha inválidos', {});
                    }
                })
            )
            .subscribe();
    }
}
