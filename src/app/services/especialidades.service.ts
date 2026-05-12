import { Injectable } from '@angular/core';
import { ESPECIALIDADES } from '../Common/data';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadesService {

  getEspecialidades(): string[] {
    const e = ESPECIALIDADES;
    return e;
  }

}
