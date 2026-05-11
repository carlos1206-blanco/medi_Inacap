import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { Alert } from '../alert/alert';


@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [ReactiveFormsModule,Navbar, CommonModule,Alert],
  templateUrl: './reserva-form.html'
})
export class ReservaForm  {

  formulario;
  guardado : boolean = false;
  mensajeDeGuardado: string = 'Reserva guardada exitosamente';
  mensajeDeError: string = 'Error al guardar la reserva. Por favor, inténtalo de nuevo.';

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  guardar() {

    if(this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

    reservas.push(this.formulario.value);

    localStorage.setItem('reservas', JSON.stringify(reservas));


    this.formulario.reset();
    this.guardado = true;
  }
}
