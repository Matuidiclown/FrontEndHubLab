// src/app/core/services/auth.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, User } from '../models/user.model';

const TOKEN_KEY = 'lap_token';
const USER_KEY  = 'lap_user';

// ── Credenciales de prueba (sin backend) ──────────────────
const MOCK_EMAIL = 'rsamame@lima-airport.com';
const MOCK_PASS  = '123456';
const MOCK_USER: User = {
  id: 1,
  nombre: 'Ricardo Samuel',
  apellido: 'Samamé Che',
  email: 'rsamame@lima-airport.com',
  telefono: '',
  fechaNacimiento: '',
  biografia: 'Analista Programador TI',
  rol: 'Usuario',
  avatarUrl: ''
};
// ─────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api    = inject(ApiService);
  private router = inject(Router);

  private _currentUser = signal<User | null>(this.getUserFromStorage());
  private _token       = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  currentUser     = this._currentUser.asReadonly();
  isAuthenticated = computed(() => !!this._token());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // ── Mock: si coincide con el usuario de prueba, no llama al backend
    if (credentials.email === MOCK_EMAIL && credentials.password === MOCK_PASS) {
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-lap-extra-2026',
        user: MOCK_USER
      };
      this.saveSession(mockResponse);
      return of(mockResponse);
    }

    // ── Producción: llama al backend real
    return this.api.post<LoginResponse>('auth/login', credentials).pipe(
      tap(response => this.saveSession(response)),
      catchError(err => throwError(() => err))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private saveSession(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    this._token.set(response.token);
    this._currentUser.set(response.user);
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }
}
