import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header [class.scrolled]="scrolled">
      <div class="container">
        <div class="header-content">
          <a routerLink="/" class="logo">Samantha</a>
          <nav [class.active]="menuActive">
            <ul>
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li><a routerLink="/filmography" routerLinkActive="active">Filmography</a></li>
              <li><a routerLink="/awards" routerLinkActive="active">Awards</a></li>
              <li><a routerLink="/charity" routerLinkActive="active">Charity</a></li>
              <li><a routerLink="/gallery" routerLinkActive="active">Gallery</a></li>
              <li><a routerLink="/quiz" routerLinkActive="active">Quiz</a></li>
            </ul>
          </nav>
          <div class="menu-toggle" (click)="toggleMenu()">
            <div class="bar" [class.animate]="menuActive"></div>
            <div class="bar" [class.animate]="menuActive"></div>
            <div class="bar" [class.animate]="menuActive"></div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1.5rem 0;
      z-index: 1000;
      transition: all 0.3s ease;
      background-color: transparent;
    }

    header.scrolled {
      background-color: var(--background-dark);
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    header.scrolled .logo {
      color: var(--primary-color);
    }

    nav ul {
      display: flex;
      list-style: none;
      gap: 2rem;
    }

    nav ul li a {
      color: var(--background-light);
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;
      transition: color 0.3s ease;
      position: relative;
    }

    nav ul li a:hover, nav ul li a.active {
      color: var(--primary-color);
    }

    nav ul li a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    nav ul li a:hover::after, nav ul li a.active::after {
      width: 100%;
    }

    header.scrolled nav ul li a {
      color: var(--text-light);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      cursor: pointer;
    }

    .bar {
      width: 30px;
      height: 3px;
      background-color: var(--primary-color);
      transition: all 0.3s ease;
    }

    .bar.animate:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }

    .bar.animate:nth-child(2) {
      opacity: 0;
    }

    .bar.animate:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }

      nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background-color: var(--background-dark);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.3s ease;
        padding: 2rem;
      }

      nav.active {
        right: 0;
      }

      nav ul {
        flex-direction: column;
        align-items: center;
      }

      nav ul li {
        margin: 1rem 0;
      }
    }
  `]
})
export class HeaderComponent {
  scrolled = false;
  menuActive = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}