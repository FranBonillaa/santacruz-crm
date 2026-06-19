import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesComponent } from '../../components/services/services';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroComponent, ServicesComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
