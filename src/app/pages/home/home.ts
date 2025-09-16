import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { NgIf, NgClass, NgFor, NgStyle } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

// TODO: Prompt: Fix Icons
//  I still can't see the icons. Let's completely redesign the technologies and languages carousel and create something more better that is able to present the icons to the technology. Can we do this please? Again, a modern clean UI feel with Tailwind..,

@Component({
  selector: 'app-home',
  imports: [NgIf, NgClass, NgFor, NgStyle],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class HomePage implements AfterViewInit, OnDestroy {
  selectedTab = 'featured';
  isTransitioning = false;

  // Carousel data and state
  frameworks = [
    {
      name: 'Spring Boot',
      icon: 'fa-brands fa-java',
      color: '#6DB33F'
    },
    {
      name: 'Angular',
      icon: 'fa-brands fa-angular',
      color: '#DD0031'
    },
    {
      name: 'Docker',
      icon: 'fa-brands fa-docker',
      color: '#2496ED'
    },
    {
      name: 'Ionic',
      icon: 'fa-solid fa-bolt',
      color: '#3880FF'
    },
    {
      name: 'PostgreSQL',
      icon: 'fa-solid fa-database',
      color: '#336791'
    }
  ];

  languages = [
    {
      name: 'Java',
      icon: 'fa-brands fa-java',
      color: '#007396'
    },
    {
      name: 'C',
      icon: 'fa-solid fa-code',
      color: '#A8B9CC'
    },
    {
      name: 'TypeScript',
      icon: 'fa-brands fa-js',
      color: '#3178C6'
    },
    {
      name: 'HTML/CSS',
      icon: 'fa-brands fa-html5',
      color: '#E34F26'
    },
    {
      name: 'Python',
      icon: 'fa-brands fa-python',
      color: '#3776AB'
    }
  ];

  ngAfterViewInit() {
    // Page fade-in using GSAP
    gsap.fromTo(
      'app-home',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power1.out" }
    );

    // Enhanced GSAP animations for hero text with stagger
    const heroElements = [
      { selector: '#hero-text p:first-child', delay: 0.2 },
      { selector: '#hero-text h1', delay: 0.4 },
      { selector: '#hero-text h2', delay: 0.6 },
      { selector: '#hero-text p:last-of-type', delay: 0.8 },
      { selector: '#hero-text .flex:first-of-type', delay: 1.0 },
      { selector: '#hero-text .flex:last-of-type', delay: 1.2 }
    ];

    heroElements.forEach(({ selector, delay }) => {
      gsap.fromTo(selector,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: delay,
          ease: "power3.out"
        }
      );
    });

    // Animate background elements
    this.animateBackgroundElements();

    // Initialize button hover effects
    this.initializeButtonEffects();
  }

  switchTab(tab: string) {
    if (this.selectedTab === tab || this.isTransitioning) return;

    this.isTransitioning = true;

    // Add smooth GSAP transition for content switching
    const currentContent = document.querySelector('.projects-content');

    if (currentContent) {
      gsap.to(currentContent, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          this.selectedTab = tab;

          // Wait for Angular to render new content, then animate in
          setTimeout(() => {
            const newContent = document.querySelector('.projects-content');
            if (newContent) {
              gsap.fromTo(newContent,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out",
                  onComplete: () => {
                    this.isTransitioning = false;
                  }
                }
              );
            } else {
              this.isTransitioning = false;
            }
          }, 50);
        }
      });
    } else {
      this.selectedTab = tab;
      this.isTransitioning = false;
    }
  }

  private animateBackgroundElements() {
    // Add subtle animation to the bird image
    const birdImage = document.querySelector('.bird-image');
    if (birdImage) {
      gsap.to(birdImage, {
        scale: 1.05,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }

  private initializeButtonEffects() {
    // Add subtle button animations with GSAP
    const buttons = document.querySelectorAll('.filter-button');

    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('scale-105')) {
          gsap.to(button, { scale: 1.02, duration: 0.2, ease: "power2.out" });
        }
      });

      button.addEventListener('mouseleave', () => {
        if (!button.classList.contains('scale-105')) {
          gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
        }
      });
    });
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
