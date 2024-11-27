import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errors: { email?: string[]; password?: string[] } = {};
  generalError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.generalError = '';
    this.errors = {};

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/protected']);
      },
      (error) => {
        console.error('Login failed:', error);

        if (error.error && error.error.errors) {
          this.errors = error.error.errors;
        } else if (error.error && error.error.message) {
          this.generalError = error.error.message;
        }
      }
    );
  }
}
