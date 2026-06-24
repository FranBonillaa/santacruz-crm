import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesData } from '../../services/services-data';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  private dataSvc = inject(ServicesData);
  services = this.dataSvc.services;

  nombre = '';
  contacto = '';
  servicio = '';
  mensaje = '';

  enviarWhatsApp() {
    const texto = `Hola, soy ${this.nombre}. Me interesa: ${this.servicio}. Para contactarme: ${this.contacto}. ${this.mensaje ? 'Mensaje: ' + this.mensaje : ''}`;
    const url = `https://wa.me/34622699116?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }
}
