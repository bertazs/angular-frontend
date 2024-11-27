import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
})
export class ProtectedComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
