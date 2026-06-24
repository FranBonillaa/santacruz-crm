import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServicesData } from '../../services/services-data';

@Component({
  selector: 'app-services',
  imports: [UpperCasePipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  private dataSvc = inject(ServicesData);

  categories = [
    'Manos y Pies',
    'Depilación Facial y Corporal',
    'Tratamientos Faciales',
    'Tratamientos Corporales',
    'Lifting de Pestañas',
    'Tratamientos INDIBA',
  ];

  activeCategory = 'Manos y Pies';

  // Todas las categorias de un servicio en concreto
  get filteredServices() {
    return this.dataSvc.services.filter((s) => s.category === this.activeCategory);
  }

  // Cambio de categoria
  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
