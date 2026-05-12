import { Component, input } from '@angular/core';
export type AlertType = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrls: ['./alert.css'],
})
export class Alert {
  mensaje= input.required<string>();
  tipo= input<AlertType>('info');
}
