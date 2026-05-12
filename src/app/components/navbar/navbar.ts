import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  authService = inject(AuthService);
  router = inject(Router);
  
  cerrarSecion() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
