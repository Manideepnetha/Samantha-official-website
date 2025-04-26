import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as GSAP from 'gsap';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="container">
        <h1>Awards & Achievements</h1>
        <p>Celebrating Samantha's exceptional talent and recognition in the film industry</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="timeline">
          <div class="timeline-item" *ngFor="let award of awards; let i = even">
            <div class="timeline-content" [class.right-aligned]="i">
              <div class="timeline-date">{{ award.year }}</div>
              <div class="timeline-card">
                <div class="award-image" *ngIf="award.image">
                  <img [src]="award.image" [alt]="award.title">
                </div>
                <div class="award-info">
                  <h3>{{ award.title }}</h3>
                  <p class="award-category">{{ award.category }}</p>
                  <p class="award-project">For: {{ award.project }}</p>
                  <p class="award-description">{{ award.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-section section">
      <div class="container">
        <h2 class="section-title">Career Achievements</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-award"></i>
            </div>
            <div class="stat-number">15</div>
            <div class="stat-title">Major Awards</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="stat-number">28</div>
            <div class="stat-title">Nominations</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-film"></i>
            </div>
            <div class="stat-number">32</div>
            <div class="stat-title">Films & Series</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-globe"></i>
            </div>
            <div class="stat-number">12</div>
            <div class="stat-title">Countries</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/2398354/pexels-photo-2398354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      height: 50vh;
      display: flex;
      align-items: center;
      text-align: center;
      color: var(--text-light);
    }

    .hero-section h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    .hero-section p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .timeline {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .timeline::after {
      content: '';
      position: absolute;
      width: 2px;
      background-color: var(--primary-color);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -1px;
    }

    .timeline-item {
      padding: 10px 50px;
      position: relative;
      margin-bottom: 50px;
    }

    .timeline-content {
      position: relative;
      width: 45%;
    }

    .timeline-content.right-aligned {
      margin-left: auto;
    }

    .timeline-date {
      position: absolute;
      top: 0;
      width: 80px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-color);
      color: var(--text-light);
      font-weight: 500;
      border-radius: 4px;
      z-index: 1;
    }

    .timeline-content:not(.right-aligned) .timeline-date {
      right: -90px;
    }

    .timeline-content.right-aligned .timeline-date {
      left: -90px;
    }

    .timeline-card {
      background-color: var(--background-light);
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .award-image img {
      width: 100%;
      border-radius: 8px;
      height: 200px;
      object-fit: cover;
    }

    .award-info h3 {
      margin-top: 0;
      color: var(--accent-color);
    }

    .award-category {
      font-weight: 500;
      color: var(--primary-color);
    }

    .award-project {
      font-style: italic;
    }

    .stats-section {
      background-color: var(--background-dark);
      color: var(--text-light);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      background-color: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
    }

    .stat-icon {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .stat-title {
      font-size: 1.2rem;
    }

    @media (max-width: 992px) {
      .timeline::after {
        left: 20px;
      }

      .timeline-content {
        width: 100%;
        padding-left: 50px;
      }

      .timeline-content.right-aligned {
        margin-left: 0;
      }

      .timeline-date {
        width: 40px;
        height: 40px;
        left: 0 !important;
        border-radius: 50%;
        right: auto !important;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 40vh;
      }

      .hero-section h1 {
        font-size: 3rem;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }

      .stat-number {
        font-size: 2.5rem;
      }
    }
  `]
})
export class AwardsComponent implements AfterViewInit {
  awards = [
    {
      year: '2023',
      title: 'International Film Award',
      category: 'Best Actress',
      project: 'The Last Dream',
      description: 'Recognized for her profound portrayal of Maya, a character dealing with loss and redemption.',
      image: 'https://images.pexels.com/photos/1409958/pexels-photo-1409958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2022',
      title: 'Golden Globe',
      category: 'Best Actress in a Drama Series',
      project: 'City Lights',
      description: 'Praised for her compelling performance as Detective Lisa Morgan in this critically acclaimed series.',
      image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2022',
      title: 'Critics Choice Award',
      category: 'Best Actress',
      project: 'Eternal Echoes',
      description: 'Her role as Leila was described as "a masterclass in subtle emotional expression" by critics.',
      image: 'https://images.pexels.com/photos/716658/pexels-photo-716658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2021',
      title: 'Asian Film Awards',
      category: 'Best Leading Actress',
      project: 'Whispers in the Dark',
      description: 'Her performance transcended language barriers and connected with audiences worldwide.',
      image: 'https://images.pexels.com/photos/7772593/pexels-photo-7772593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2020',
      title: 'National Film Award',
      category: 'Best Actress',
      project: 'Beyond Horizons',
      description: 'One of the nation\'s highest film honors was bestowed for her role as Ava.',
      image: 'https://images.pexels.com/photos/1782538/pexels-photo-1782538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2019',
      title: 'Filmfare Award',
      category: 'Best Actress',
      project: 'The Silent Valley',
      description: 'Her portrayal of Emma captured the hearts of audiences and critics alike.',
      image: 'https://images.pexels.com/photos/7772593/pexels-photo-7772593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Timeline animations
    GSAP.gsap.from('.timeline-content', {
      opacity: 0,
      x: function(index) {
        return index % 2 === 0 ? -50 : 50;
      },
      stagger: 0.3,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%',
      }
    });

    // Stats animations
    GSAP.gsap.from('.stat-card', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 80%',
      }
    });
  }
}