import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
