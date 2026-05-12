import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginCredenciales } from '../../model/loginModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginError = '';
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);


  readonly loginForm = this.fb.group({
    rutUser: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{7,8}-[0-9kK]$/)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  ingresar() {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const rutUsuario = this.loginForm.value.rutUser || '';
    const claveUsuario = this.loginForm.value.password || '';

    const rutValido = this.validateRut(rutUsuario);

    console.log(rutValido);
    if (!rutValido) {
      this.loginError = 'RUT ingresado no es válido';
      return;
    }

    const credenciales: LoginCredenciales = {
      usuarioRut: rutUsuario,
      clave: claveUsuario
    }

    const loginExitoso = this.authService.login(credenciales);

    if (loginExitoso) {
      this.router.navigate(['/reserva']);
    } else {
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }

  validateRut = (rutCompleto: string): boolean => {

    const cleanRut = rutCompleto.replace(/[^0-9kK]/g, "");

    if (cleanRut.length < 3) return false;


    const rutBody = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toLowerCase();


    let m = 0, s = 1;
    let t = parseInt(rutBody, 10);

    for (; t; t = Math.floor(t / 10)) {
      s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
    }

    const expectedDv = s ? (s - 1).toString() : 'k';


    return dv === expectedDv;
  };

}
