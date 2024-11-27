import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  private tokenKey = 'authToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/protected']);
        }
      })
    );
  }

  register(name: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
