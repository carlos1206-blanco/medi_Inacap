import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Reserva } from '../../model/reservaModel';

@Component({
  selector: 'app-reserva-list',
  standalone: true, 
  imports: [Navbar],
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

    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

    const index = reservas.indexOf(reserva);
    if (index !== -1) {
      reservas.splice(index, 1);
    }

    localStorage.setItem('reservas', JSON.stringify(reservas));

    this.reservas = reservas;
  }
}