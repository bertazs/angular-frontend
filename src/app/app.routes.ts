import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';
import { AutoRedirectGuard } from './guards/auto-redirect.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AutoRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AutoRedirectGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
];

export const appRouterProviders = [provideRouter(routes)];
