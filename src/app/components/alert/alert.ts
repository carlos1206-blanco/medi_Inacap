import { Component, input } from '@angular/core';
export type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  mensaje= input.required<string>();
  tipo= input<AlertType>('info');
}
