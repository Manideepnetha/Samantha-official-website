import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import * as GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

GSAP.gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SwiperComponent],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1 class="name">Samantha</h1>
        <p class="tagline">Actress | Philanthropist | Icon</p>
        <div class="social-icons">
          <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>
    </section>

    <section class="intro section">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <h2 class="section-title">About Samantha</h2>
            <p>Samantha is an acclaimed actress known for her versatile performances across multiple film industries. With a career spanning over a decade, she has established herself as one of the most talented and beloved actresses of her generation.</p>
            <p>Beyond her acting career, Samantha is passionate about philanthropy and social causes, working actively to make a difference in the lives of those less fortunate.</p>
            <div class="btn-group">
              <a routerLink="/filmography" class="btn">Explore Filmography</a>
              <a routerLink="/charity" class="btn btn-outline">Charitable Work</a>
            </div>
          </div>
          <div class="intro-image">
            <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Samantha portrait">
          </div>
        </div>
      </div>
    </section>

    <section class="featured-work section">
      <div class="container">
        <h2 class="section-title">Featured Work</h2>
        <app-swiper [slides]="featuredFilms"></app-swiper>
      </div>
    </section>

    <section class="latest-news section">
      <div class="container">
        <h2 class="section-title">Latest Updates</h2>
        <div class="news-grid">
          <div class="news-item" *ngFor="let news of latestNews">
            <div class="news-image">
              <img [src]="news.image" [alt]="news.title">
            </div>
            <div class="news-content">
              <span class="news-date">{{ news.date }}</span>
              <h3>{{ news.title }}</h3>
              <p>{{ news.excerpt }}</p>
              <a href="javascript:void(0)" class="read-more">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="quote-section section">
      <div class="container">
        <div class="quote">
          <i class="fas fa-quote-left"></i>
          <p>Acting is not about being someone different. It's finding the similarity in what is apparently different, then finding myself in there.</p>
          <span class="quote-author">- Samantha</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 100vh;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3062543/pexels-photo-3062543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--text-light);
    }

    .hero-content {
      max-width: 800px;
      padding: 0 1rem;
    }

    .name {
      font-size: 6rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      animation: fadeInDown 1.5s ease;
    }

    .tagline {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      animation: fadeIn 2s ease 0.5s forwards;
      opacity: 0;
    }

    .social-icons {
      animation: fadeIn 2s ease 1s forwards;
      opacity: 0;
    }

    .social-icons a {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .intro-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .intro-text {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .intro-image img {
      border-radius: 10px;
      box-shadow: var(--shadow);
    }

    .btn-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .featured-work {
      background-color: var(--background-dark);
      color: var(--text-light);
    }

    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .news-item {
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease;
      background-color: var(--background-light);
    }

    .news-item:hover {
      transform: translateY(-5px);
    }

    .news-image img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .news-content {
      padding: 1.5rem;
    }

    .news-date {
      color: var(--accent-color);
      font-size: 0.9rem;
    }

    .news-content h3 {
      margin: 0.5rem 0 1rem;
    }

    .read-more {
      display: inline-block;
      margin-top: 1rem;
      font-weight: 500;
    }

    .quote-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }

    .quote {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      color: var(--text-light);
    }

    .quote i {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .quote p {
      font-size: 1.8rem;
      font-family: 'Playfair Display', serif;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .quote-author {
      font-style: italic;
      font-size: 1.2rem;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @media (max-width: 992px) {
      .intro-content {
        grid-template-columns: 1fr;
      }

      .intro-image {
        order: -1;
      }
    }

    @media (max-width: 768px) {
      .name {
        font-size: 3.5rem;
      }

      .tagline {
        font-size: 1.2rem;
      }

      .quote p {
        font-size: 1.5rem;
      }

      .news-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  featuredFilms = [
    {
      title: 'The Last Dream',
      image: 'https://images.pexels.com/photos/8273454/pexels-photo-8273454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Maya',
      year: '2023'
    },
    {
      title: 'Eternal Echoes',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Leila',
      year: '2022'
    },
    {
      title: 'Whispers in the Dark',
      image: 'https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Sarah',
      year: '2021'
    },
    {
      title: 'Beyond Horizons',
      image: 'https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Ava',
      year: '2020'
    }
  ];

  latestNews = [
    {
      title: 'Samantha Begins Shooting for New Film',
      image: 'https://images.pexels.com/photos/3062544/pexels-photo-3062544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'May 15, 2023',
      excerpt: 'Samantha has started shooting for her upcoming feature film directed by acclaimed director Joseph Miller.'
    },
    {
      title: 'Charity Gala Raises $2 Million for Education',
      image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 28, 2023',
      excerpt: 'The annual charity gala hosted by Samantha raised over $2 million for education initiatives in underserved communities.'
    },
    {
      title: 'New Award Nomination Announced',
      image: 'https://images.pexels.com/photos/2398355/pexels-photo-2398355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'March 10, 2023',
      excerpt: 'Samantha receives her fifth nomination for Best Actress at the International Film Awards for her role in "Eternal Echoes".'
    }
  ];

  ngOnInit() {
    // Initialize any data
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    GSAP.gsap.from('.intro-text', {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: '.intro-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    GSAP.gsap.from('.intro-image', {
      opacity: 0,
      x: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.intro-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    GSAP.gsap.from('.news-item', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.news-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    GSAP.gsap.from('.quote', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  }
}