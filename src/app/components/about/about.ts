import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {}
