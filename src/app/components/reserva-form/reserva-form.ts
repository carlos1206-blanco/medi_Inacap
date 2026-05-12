import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { EspecialidadesService } from '../../services/especialidades.service';
import { Alert } from '../alert/alert';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    Navbar, 
    CommonModule, 
    Alert, 
    Footer
  ],
  templateUrl: './reserva-form.html'
})
export class ReservaForm {

  formulario;
  guardado = signal(false);
  error = signal(false);
  private successTimer: ReturnType<typeof setTimeout> | null = null;
  private errorTimer: ReturnType<typeof setTimeout> | null = null;
  mensajeDeGuardado: string = 'Reserva guardada exitosamente';
  mensajeDeError: string = '';
  especialidades: string[] = [];
  fechaHoy: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private especialidadesService: EspecialidadesService) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    this.especialidades = this.especialidadesService.getEspecialidades();
  }

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeDeError = 'Error al guardar la reserva. Por favor, inténtalo de nuevo.';
      this.mostrarErrorPor3Segundos();
      return;
    }

    const fechaValida = this.validadarFecha();

    if (!fechaValida) {
      this.mensajeDeError = 'La fecha seleccionada no puede ser anterior a hoy.';
      this.mostrarErrorPor3Segundos();
      return;
    }


    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

    reservas.push(this.formulario.value);

    localStorage.setItem('reservas', JSON.stringify(reservas));

    this.formulario.reset();
    this.mostrarGuardadoPor3Segundos();

  }

  validadarFecha(): boolean {
    if (this.formulario.value.fecha! < this.fechaHoy) {
      this.formulario.get('fecha')?.setErrors({ fechaInvalida: true });
      return false;
    }
    return true;
  }

  private mostrarGuardadoPor3Segundos() {
    this.error.set(false);
    this.guardado.set(true);

    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }

    this.successTimer = setTimeout(() => {
      this.guardado.set(false);
      this.successTimer = null;
    }, 3000);
  }

  private mostrarErrorPor3Segundos() {
    this.guardado.set(false);
    this.error.set(true);

    if (this.errorTimer) {
      clearTimeout(this.errorTimer);
    }

    this.errorTimer = setTimeout(() => {
      this.error.set(false);
      this.errorTimer = null;
    }, 3000);
  }
}
