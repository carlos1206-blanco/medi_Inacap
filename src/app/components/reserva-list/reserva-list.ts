import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Reserva } from '../../model/reservaModel';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './reserva-list.html'
})
export class ReservaList {

  reservas: Reserva[] = [];

  ngOnInit() {
    this.reservas = JSON.parse(
      localStorage.getItem('reservas') || '[]'
    );
  }

  eliminarReserva(reserva: Reserva) {

    const reservas: Reserva[] = JSON.parse(
      localStorage.getItem('reservas') || '[]'
    );

    const nuevasReservas = reservas.filter(r =>
      !(r.nombre === reserva.nombre &&
        r.fecha === reserva.fecha &&
        r.especialidad === reserva.especialidad)
    );

    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

    this.reservas = nuevasReservas;
  }
}