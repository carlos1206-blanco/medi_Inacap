import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario: string = '';
  password: string = '';
  constructor(private router: Router ) { }

  login() {
    if (this.usuario === 'admin' && this.password === 'admin') {
      this.router.navigate(['/reserva']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
