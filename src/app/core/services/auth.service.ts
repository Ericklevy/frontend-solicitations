import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // O Controller de Auth no backend (Java) está mapeado como "/auth" e não "/api/auth".
  // Por isso precisamos remover a string '/api' da base da URL para as chamadas de login.
  private apiUrl = environment.apiUrl.replace('/api', '') + '/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(res => this.setToken(res))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(res => this.setToken(res))
    );
  }

  setToken(res: AuthResponse): void {
    localStorage.setItem('token', res.token);
    if (res.role) {
      localStorage.setItem('role', res.role);
    }
    if (res.name) {
      localStorage.setItem('name', res.name);
    }
    if (res.email) {
      localStorage.setItem('email', res.email);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
