import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment.development';

declare const google: any;

export interface User { name: string; email: string; picture: string; }
interface AuthResponse { token: string; user: User; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _user = signal<User | null>(this.load('user'));
  private _token = signal<string | null>(this.load('token'));

  user = this._user.asReadonly();
  token = this._token.asReadonly();
  isLoggedIn = computed(() => !!this._token());

  private gsiLoaded?: Promise<void>;

  // Loads Google's script once, resolves when ready
  loadGoogleScript(): Promise<void> {
    if (this.gsiLoaded) return this.gsiLoaded;
    this.gsiLoaded = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load Google script'));
      document.head.appendChild(s);
    });
    return this.gsiLoaded;
  }

  // Called with the Google ID token; backend verifies it and returns our own session
  async signInWithGoogle(idToken: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth/google`, { idToken })
    );
    this._token.set(res.token);
    this._user.set(res.user);
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    // Only disable auto-select if Google script is loaded
    if (typeof google !== 'undefined' && google.accounts?.id) {
      google.accounts.id.disableAutoSelect(); // stops one-tap auto re-login
    }
    this._token.set(null);
    this._user.set(null);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private load(key: string) {
    try {
      const v = sessionStorage.getItem(key);
      return v ? (key === 'user' ? JSON.parse(v) : v) : null;
    } catch { return null; }
  }
}