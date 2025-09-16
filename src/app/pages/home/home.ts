import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

// TODO: Prompt: I still can't see the icons. Let's completely redesign the technologies and languages carousel and create something more better that is able to present the icons to the technology. Can we do this please? Again, a modern clean UI feel with Tailwind.., 

@Component({
  selector: 'app-home',
  imports: [NgIf, NgClass, NgFor],
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
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'Angular', 
      icon: '<path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
    },
    { 
      name: 'Docker', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'Ionic', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'PostgreSQL', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    }
  ];
  
  languages = [
    { 
      name: 'Java', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'C', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'TypeScript', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'HTML/CSS', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    },
    { 
      name: 'Python', 
      icon: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
    }
  ];
  
  currentFrameworkIndex = 0;
  currentLanguageIndex = 0;
  frameworksOffset = 0;
  languagesOffset = 0;
  private carouselInterval: any;
  
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
    
    // Start carousel auto-rotation
    this.startCarouselRotation();
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

  // Carousel methods
  goToFramework(index: number) {
    this.currentFrameworkIndex = index;
    this.frameworksOffset = -index * 100; // Each item is 100% width
  }

  goToLanguage(index: number) {
    this.currentLanguageIndex = index;
    this.languagesOffset = -index * 100; // Each item is 100% width
  }

  nextFramework() {
    this.currentFrameworkIndex = (this.currentFrameworkIndex + 1) % this.frameworks.length;
    this.frameworksOffset = -this.currentFrameworkIndex * 100;
  }

  nextLanguage() {
    this.currentLanguageIndex = (this.currentLanguageIndex + 1) % this.languages.length;
    this.languagesOffset = -this.currentLanguageIndex * 100;
  }

  startCarouselRotation() {
    this.carouselInterval = setInterval(() => {
      this.nextFramework();
      this.nextLanguage();
    }, 3000); // Change every 3 seconds
  }

  stopCarouselRotation() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  ngOnDestroy() {
    this.stopCarouselRotation();
  }
}