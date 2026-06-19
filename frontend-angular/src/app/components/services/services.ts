import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [UpperCasePipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  categories = [
    'Manos y Pies',
    'Depilación Facial y Corporal',
    'Tratamientos Faciales',
    'Tratamientos Corporales',
    'Lifting de Pestañas',
  ];

  activeCategory = 'Manos y Pies';

  // Todos los servicios actuales
  services = [
    // Manos y Pies
    { category: 'Manos y Pies', name: 'Manicura', price: 10 },
    { category: 'Manos y Pies', name: 'Esmaltado semipermanente', price: 16 },
    { category: 'Manos y Pies', name: 'Esmaltado semipermanente con relleno', price: 25 },
    { category: 'Manos y Pies', name: 'Retirada semipermanente', price: 10 },
    { category: 'Manos y Pies', name: 'Pedicura', price: 25 },
    { category: 'Manos y Pies', name: 'Pedicura + esmaltado semipermanente', price: 41 },
    { category: 'Manos y Pies', name: 'Pedicura + esmaltado normal', price: 35 },
    { category: 'Manos y Pies', name: 'Esmaltado semipermanente en pies', price: 16 },
    { category: 'Manos y Pies', name: 'Esmaltado normal en pies', price: 10 },
    { category: 'Manos y Pies', name: '1ª puesta uñas acrílicas', price: 35 },
    { category: 'Manos y Pies', name: 'Relleno de uñas', price: 25 },
    { category: 'Manos y Pies', name: 'Arreglo uña rota', price: 3 },

    // Depilación Facial y Corporal
    { category: 'Depilación Facial y Corporal', name: 'Depilación cejas', price: 7 },
    { category: 'Depilación Facial y Corporal', name: 'Tinte de cejas', price: 5 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación cejas + tinte', price: 12 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación labio superior', price: 3 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación labio inferior', price: 3 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación mentón', price: 4 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación pómulos', price: 4 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación nariz', price: 3 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación brazos completos', price: 14 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación medios brazos', price: 7 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación axilas', price: 8 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación espalda', price: 15 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación piernas completas', price: 18 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación medias piernas', price: 9 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación ingles normales', price: 8 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación ingles brasileñas', price: 12 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación pubis completo', price: 14 },
    { category: 'Depilación Facial y Corporal', name: 'Depilación perianal', price: null },
    { category: 'Depilación Facial y Corporal', name: 'Depilación glúteos', price: 8 },

    // Tratamientos Faciales
    { category: 'Tratamientos Faciales', name: 'Higiene facial', price: 49.99 },
    { category: 'Tratamientos Faciales', name: 'Collagen Booster', price: 90 },
    { category: 'Tratamientos Faciales', name: 'Hyaluronic', price: 60 },
    { category: 'Tratamientos Faciales', name: 'Glycolic + Vitamina C', price: 60 },
    { category: 'Tratamientos Faciales', name: 'Tratamiento pieles grasas', price: 60 },
    { category: 'Tratamientos Faciales', name: 'Lab Biotics - Probiotics', price: 60 },
    { category: 'Tratamientos Faciales', name: 'Tratamiento despigmentante', price: 60 },
    { category: 'Tratamientos Faciales', name: 'Bioceuticals - Tratamiento reparante', price: 60 },

    // Tratamientos Corporales
    { category: 'Tratamientos Corporales', name: 'Presoterapia', price: 10 },
    {
      category: 'Tratamientos Corporales',
      name: 'Presoterapia + masaje drenante (45 min)',
      price: 20,
    },
    { category: 'Tratamientos Corporales', name: 'Masaje relajante cuerpo completo 1h', price: 45 },
    { category: 'Tratamientos Corporales', name: 'Masaje relajante 30 min', price: 22 },

    // Lifting de Pestañas
    { category: 'Lifting de Pestañas', name: 'Lifting de pestañas', price: 40 },
    { category: 'Lifting de Pestañas', name: 'Lifting de pestañas (promoción)', price: 36 },
  ];

  // Todas las categorias de un servicio en concreto
  get filteredServices() {
    return this.services.filter((s) => s.category === this.activeCategory);
  }

  // Cambio de categoria
  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
