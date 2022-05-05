import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    constructor() { }
    signOut(): void {
        window.sessionStorage.clear();
    }
    getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }
    saveRefreshToken(token: string): void {
        window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
        window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
    }
    saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
}