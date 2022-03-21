// Angular
import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {

    public getAccessToken(): string {
        const token: string = localStorage.getItem('accessToken');
        return token;
    }

    public setAccessToken(token: string): void {
        localStorage.setItem('accessToken', token);
    }

    public setNome(nome: string): void {
        localStorage.setItem('username', nome);
    }

    public clear() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
    }
}
