import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as GSAP from 'gsap';

@Component({
  selector: 'app-filmography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="container">
        <h1>Filmography</h1>
        <p>Discover Samantha's acting journey through her diverse roles and performances</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="filter-container">
          <button 
            *ngFor="let filter of filters" 
            [class.active]="activeFilter === filter.value" 
            (click)="filterMovies(filter.value)">
            {{ filter.label }}
          </button>
        </div>

        <div class="movies-grid">
          <div class="movie-card" *ngFor="let movie of filteredMovies" [attr.data-category]="movie.type">
            <div class="movie-poster">
              <img [src]="movie.poster" [alt]="movie.title">
              <div class="movie-hover">
                <span class="year">{{ movie.year }}</span>
                <h3>{{ movie.title }}</h3>
                <p class="role">as {{ movie.role }}</p>
                <p class="director">Directed by {{ movie.director }}</p>
              </div>
            </div>
            <div class="movie-info">
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.year }} | {{ movie.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="awards-highlight section">
      <div class="container">
        <h2 class="section-title">Award-Winning Performances</h2>
        <div class="awards-grid">
          <div class="award-card" *ngFor="let award of awardWinningMovies">
            <div class="award-image">
              <img [src]="award.poster" [alt]="award.title">
              <div class="award-badge">
                <i class="fas fa-award"></i>
              </div>
            </div>
            <div class="award-info">
              <h3>{{ award.title }}</h3>
              <p><strong>{{ award.awardName }}</strong></p>
              <p>{{ award.awardYear }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/7991164/pexels-photo-7991164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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

    .filter-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .filter-container button {
      padding: 0.8rem 1.5rem;
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--text-color);
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-container button.active, .filter-container button:hover {
      background-color: var(--primary-color);
      color: var(--text-light);
    }

    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .movie-card {
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease;
    }

    .movie-card:hover {
      transform: translateY(-5px);
    }

    .movie-poster {
      position: relative;
      overflow: hidden;
      height: 350px;
    }

    .movie-poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .movie-card:hover .movie-poster img {
      transform: scale(1.1);
    }

    .movie-hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      color: var(--text-light);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .movie-card:hover .movie-hover {
      opacity: 1;
    }

    .movie-hover .year {
      color: var(--primary-color);
      font-weight: 500;
    }

    .movie-hover h3 {
      margin: 0.5rem 0;
    }

    .movie-hover .role {
      font-style: italic;
      margin-bottom: 0.5rem;
    }

    .movie-info {
      padding: 1.5rem;
      background-color: var(--background-light);
    }

    .movie-info h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    .awards-highlight {
      background-color: var(--background-dark);
      color: var(--text-light);
    }

    .awards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .award-card {
      display: flex;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }

    .award-image {
      width: 120px;
      position: relative;
    }

    .award-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .award-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      background-color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .award-info {
      padding: 1rem;
      flex: 1;
    }

    .award-info h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 40vh;
      }

      .hero-section h1 {
        font-size: 3rem;
      }

      .awards-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FilmographyComponent implements AfterViewInit {
  movies = [
    {
      title: 'The Last Dream',
      poster: 'https://images.pexels.com/photos/8273454/pexels-photo-8273454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2023,
      type: 'film',
      role: 'Maya',
      director: 'Christopher Nolan'
    },
    {
      title: 'Eternal Echoes',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      type: 'film',
      role: 'Leila',
      director: 'David Fincher'
    },
    {
      title: 'Whispers in the Dark',
      poster: 'https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2021,
      type: 'film',
      role: 'Sarah',
      director: 'Denis Villeneuve'
    },
    {
      title: 'Beyond Horizons',
      poster: 'https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2020,
      type: 'film',
      role: 'Ava',
      director: 'Greta Gerwig'
    },
    {
      title: 'City Lights',
      poster: 'https://images.pexels.com/photos/6899742/pexels-photo-6899742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2022,
      type: 'series',
      role: 'Detective Lisa Morgan',
      director: 'Ryan Murphy'
    },
    {
      title: 'The Silent Valley',
      poster: 'https://images.pexels.com/photos/7234323/pexels-photo-7234323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2019,
      type: 'film',
      role: 'Emma',
      director: 'Jane Campion'
    },
    {
      title: 'Midnight Chronicles',
      poster: 'https://images.pexels.com/photos/7772589/pexels-photo-7772589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2021,
      type: 'series',
      role: 'Luna',
      director: 'Phoebe Waller-Bridge'
    },
    {
      title: 'The Last Summer',
      poster: 'https://images.pexels.com/photos/3779825/pexels-photo-3779825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: 2018,
      type: 'film',
      role: 'Claire',
      director: 'Sofia Coppola'
    }
  ];

  awardWinningMovies = [
    {
      title: 'Eternal Echoes',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      awardName: 'Best Actress - International Film Awards',
      awardYear: '2022'
    },
    {
      title: 'Whispers in the Dark',
      poster: 'https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      awardName: 'Best Supporting Actress - Golden Globe',
      awardYear: '2021'
    },
    {
      title: 'The Silent Valley',
      poster: 'https://images.pexels.com/photos/7234323/pexels-photo-7234323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      awardName: 'Critics Choice Award',
      awardYear: '2019'
    }
  ];

  filters = [
    { label: 'All', value: 'all' },
    { label: 'Films', value: 'film' },
    { label: 'TV Series', value: 'series' },
    { label: 'Recent', value: 'recent' }
  ];

  activeFilter: string = 'all';
  filteredMovies: any[] = this.movies;

  ngAfterViewInit() {
    this.initAnimations();
  }

  filterMovies(filterValue: string) {
    this.activeFilter = filterValue;
    
    if (filterValue === 'all') {
      this.filteredMovies = this.movies;
    } else if (filterValue === 'recent') {
      this.filteredMovies = this.movies.filter(movie => movie.year >= 2021);
    } else {
      this.filteredMovies = this.movies.filter(movie => movie.type === filterValue);
    }

    // Animate the filtered movies
    GSAP.gsap.from('.movie-card', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power1.out',
      clearProps: 'all'
    });
  }

  initAnimations() {
    GSAP.gsap.from('.movie-card', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.movies-grid',
        start: 'top 80%'
      }
    });

    GSAP.gsap.from('.award-card', {
      opacity: 0,
      x: -50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.awards-grid',
        start: 'top 80%'
      }
    });
  }
}