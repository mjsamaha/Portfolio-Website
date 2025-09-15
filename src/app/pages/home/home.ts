import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { NgIf, NgClass } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgClass],
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
export class HomePage implements AfterViewInit {
  selectedTab = 'featured';
  isTransitioning = false;
  
  ngAfterViewInit() {
    // Page fade-in using GSAP
    gsap.fromTo(
      'app-home',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power1.out" }
    );

    // GSAP fade-in stagger for hero text
    gsap.to('#hero-text h2', { opacity: 1, y: -20, duration: 1, ease: "power3.out" });
    gsap.to('#hero-text p', { opacity: 1, y: -10, duration: 1, delay: 0.4, ease: "power3.out" });
    
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
}