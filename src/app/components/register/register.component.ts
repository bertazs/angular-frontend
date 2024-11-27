import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../shared/input/input.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errors: { name?: string[]; email?: string[]; password?: string[] } = {};
  generalError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.generalError = '';
    this.errors = {};

    if (this.password !== this.confirmPassword) {
      this.errors.password = ['Passwords do not match'];
      return;
    }

    this.authService.register(this.name, this.email, this.password, this.confirmPassword).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);

        if (error.error && error.error.errors) {
          this.errors = error.error.errors;
        } else if (error.error && error.error.message) {
          this.generalError = error.error.message;
        }
      }
    );
  }
}
