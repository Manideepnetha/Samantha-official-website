import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as GSAP from 'gsap';

@Component({
  selector: 'app-charity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="container">
        <h1>Charity & Social Service</h1>
        <p>Explore Samantha's philanthropic initiatives and her commitment to making a difference</p>
      </div>
    </section>

    <section class="mission section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">Making a Difference</h2>
            <p>Samantha is deeply committed to giving back to society and using her platform for positive change. Through her foundation and partnerships with various organizations, she supports causes related to education, women's empowerment, children's welfare, and healthcare access.</p>
            <blockquote>
              "I believe that true success comes not just from personal achievements, but from the positive impact we can have on others' lives."
              <cite>- Samantha</cite>
            </blockquote>
          </div>
          <div class="mission-image">
            <img src="https://images.pexels.com/photos/6348120/pexels-photo-6348120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Samantha at charity event">
          </div>
        </div>
      </div>
    </section>

    <section class="causes section">
      <div class="container">
        <h2 class="section-title">Causes Supported</h2>
        <div class="causes-grid">
          <div class="cause-card" *ngFor="let cause of causes">
            <div class="cause-icon">
              <i [class]="cause.icon"></i>
            </div>
            <h3>{{ cause.title }}</h3>
            <p>{{ cause.description }}</p>
            <a [href]="cause.link" class="btn btn-outline" target="_blank">Support This Cause</a>
          </div>
        </div>
      </div>
    </section>

    <section class="foundation section">
      <div class="container">
        <div class="foundation-content">
          <div class="foundation-image">
            <img src="https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Samantha Foundation">
          </div>
          <div class="foundation-text">
            <h2 class="section-title">The Samantha Foundation</h2>
            <p>Established in 2018, The Samantha Foundation works to create sustainable change in communities through targeted initiatives in education, healthcare, and women's empowerment.</p>
            <p>The foundation's flagship programs include:</p>
            <ul>
              <li><strong>Bright Future Scholarships:</strong> Educational support for underprivileged children</li>
              <li><strong>Women Rise:</strong> Skills development and entrepreneurship for women</li>
              <li><strong>Health For All:</strong> Improving healthcare access in rural communities</li>
            </ul>
            <a href="javascript:void(0)" class="btn">Donate Now</a>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery-section section">
      <div class="container">
        <h2 class="section-title">Impact Gallery</h2>
        <div class="charity-gallery">
          <div class="gallery-item" *ngFor="let image of galleryImages">
            <img [src]="image.url" [alt]="image.caption">
            <div class="gallery-caption">
              <p>{{ image.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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

    .mission-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .mission-text blockquote {
      border-left: 3px solid var(--primary-color);
      padding-left: 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      font-size: 1.2rem;
    }

    blockquote cite {
      display: block;
      text-align: right;
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .mission-image img {
      border-radius: 10px;
      box-shadow: var(--shadow);
    }

    .causes {
      background-color: var(--background-dark);
      color: var(--text-light);
    }

    .causes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .cause-card {
      background-color: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .cause-card:hover {
      transform: translateY(-5px);
    }

    .cause-icon {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
    }

    .cause-card h3 {
      margin-bottom: 1rem;
    }

    .cause-card p {
      margin-bottom: 1.5rem;
    }

    .foundation-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .foundation-image img {
      border-radius: 10px;
      box-shadow: var(--shadow);
    }

    .foundation-text ul {
      margin: 1.5rem 0;
      padding-left: 1.5rem;
    }

    .foundation-text li {
      margin-bottom: 0.8rem;
    }

    .charity-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .gallery-item {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      height: 250px;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .gallery-item:hover img {
      transform: scale(1.1);
    }

    .gallery-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 1rem;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: var(--text-light);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-item:hover .gallery-caption {
      opacity: 1;
    }

    @media (max-width: 992px) {
      .mission-content, .foundation-content {
        grid-template-columns: 1fr;
      }

      .mission-image, .foundation-image {
        order: -1;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 40vh;
      }

      .hero-section h1 {
        font-size: 3rem;
      }

      .causes-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CharityComponent implements AfterViewInit {
  causes = [
    {
      title: 'Education for All',
      description: 'Supporting access to quality education for underprivileged children through scholarships, school supplies, and infrastructure development.',
      icon: 'fas fa-graduation-cap',
      link: 'https://www.unicef.org/education'
    },
    {
      title: 'Women\'s Empowerment',
      description: 'Promoting gender equality and women\'s rights through skills training, entrepreneurship programs, and advocacy against gender-based violence.',
      icon: 'fas fa-venus',
      link: 'https://www.unwomen.org'
    },
    {
      title: 'Children\'s Welfare',
      description: 'Working to protect children\'s rights and improve their well-being through nutrition programs, healthcare initiatives, and safe spaces.',
      icon: 'fas fa-child',
      link: 'https://www.savethechildren.org'
    },
    {
      title: 'Healthcare Access',
      description: 'Supporting medical camps, healthcare facilities, and awareness programs to ensure essential healthcare services reach underserved communities.',
      icon: 'fas fa-heartbeat',
      link: 'https://www.who.int'
    }
  ];

  galleryImages = [
    {
      url: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Samantha at the annual charity gala raising funds for education'
    },
    {
      url: 'https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Visiting a school built with support from The Samantha Foundation'
    },
    {
      url: 'https://images.pexels.com/photos/6646967/pexels-photo-6646967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Supporting healthcare initiatives in rural communities'
    },
    {
      url: 'https://images.pexels.com/photos/8942843/pexels-photo-8942843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Empowering women through skills development workshops'
    },
    {
      url: 'https://images.pexels.com/photos/8942970/pexels-photo-8942970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Distributing educational materials to underprivileged children'
    },
    {
      url: 'https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Participating in environmental conservation initiatives'
    }
  ];

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Mission section animation
    GSAP.gsap.from('.mission-text', {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: '.mission-content',
        start: 'top 80%'
      }
    });

    GSAP.gsap.from('.mission-image', {
      opacity: 0,
      x: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.mission-content',
        start: 'top 80%'
      }
    });

    // Causes cards animation
    GSAP.gsap.from('.cause-card', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.causes-grid',
        start: 'top 80%'
      }
    });

    // Foundation section animation
    GSAP.gsap.from('.foundation-text', {
      opacity: 0,
      x: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.foundation-content',
        start: 'top 80%'
      }
    });

    GSAP.gsap.from('.foundation-image', {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: '.foundation-content',
        start: 'top 80%'
      }
    });

    // Gallery animation
    GSAP.gsap.from('.gallery-item', {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.charity-gallery',
        start: 'top 80%'
      }
    });
  }
}