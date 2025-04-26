import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h2>Samantha</h2>
            <p>Actress | Philanthropist | Icon</p>
            <div class="social-icons">
              <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            </div>
          </div>

          <div class="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/filmography">Filmography</a></li>
              <li><a routerLink="/awards">Awards</a></li>
              <li><a routerLink="/charity">Charity</a></li>
              <li><a routerLink="/gallery">Gallery</a></li>
              <li><a routerLink="/quiz">Quiz</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h3>Contact</h3>
            <form (ngSubmit)="submitForm()">
              <div class="form-group">
                <input type="text" name="name" placeholder="Your Name" [(ngModel)]="contactForm.name" required>
              </div>
              <div class="form-group">
                <input type="email" name="email" placeholder="Your Email" [(ngModel)]="contactForm.email" required>
              </div>
              <div class="form-group">
                <textarea name="message" placeholder="Your Message" [(ngModel)]="contactForm.message" required></textarea>
              </div>
              <button type="submit" class="btn">Send Message</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Samantha Official Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: var(--background-dark);
      color: var(--text-light);
      padding: 5rem 0 2rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .footer-logo h2 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .footer-logo p {
      margin-bottom: 1.5rem;
    }

    .footer-links h3, .footer-contact h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
    }

    .footer-links h3::after, .footer-contact h3::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: var(--primary-color);
    }

    .footer-links ul {
      list-style: none;
    }

    .footer-links ul li {
      margin-bottom: 0.8rem;
    }

    .footer-links ul li a {
      color: var(--text-light);
      transition: color 0.3s ease;
    }

    .footer-links ul li a:hover {
      color: var(--primary-color);
      padding-left: 5px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      color: var(--text-light);
    }

    .form-group textarea {
      height: 100px;
      resize: none;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    // This would typically connect to a backend service
    console.log('Form submitted:', this.contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
  }
}