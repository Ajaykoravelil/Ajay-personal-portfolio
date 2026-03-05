import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Hero } from './core/hero/hero';
import { Skills } from './features/skills/skills';
import { Projects } from './features/projects/projects';
import { Services } from './features/services/services';
import { Certifications } from './features/certifications/certifications';
import { Contact } from './features/contact/contact';
import { Header } from './core/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, Skills, Projects, Services, Certifications, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  protected readonly title = 'Ajay Baiju - Portfolio';

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ScrollReveal = (await import('scrollreveal')).default;

      const sr = ScrollReveal({
        duration: 2000,
        distance: "100px",
        delay: 400,
        reset: false,
      });

      // Hero Elements
      sr.reveal(".hero-content, .section-title");
      sr.reveal(".hero-visual", { origin: "top" });

      // Staggered Grid Elements
      sr.reveal(
        ".skill-category, .project-card, .service-card, .cert-card, .footer-content",
        {
          delay: 500,
          interval: 100,
        }
      );

      // Contact Section
      sr.reveal(".contact-info", { origin: "left" });
      sr.reveal(".contact-form", { origin: "right" });
    }
  }
}
