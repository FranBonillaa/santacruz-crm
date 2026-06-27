import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit() {
    gsap.from('#inicio .hero-content > *', {
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.1,
      ease: 'power2.out',
      clearProps: 'opacity',
    });
  }
}
