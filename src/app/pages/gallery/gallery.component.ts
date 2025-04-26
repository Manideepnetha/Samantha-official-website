import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as GSAP from 'gsap';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="container">
        <h1>Gallery</h1>
        <p>Explore Samantha's visual journey through films, events, and photoshoots</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="filter-container">
          <button 
            *ngFor="let category of categories" 
            [class.active]="activeCategory === category.value" 
            (click)="filterGallery(category.value)">
            {{ category.label }}
          </button>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item" *ngFor="let item of filteredGalleryItems" [attr.data-category]="item.category" (click)="openLightbox(item)">
            <img [src]="item.thumbnail" [alt]="item.title">
            <div class="gallery-overlay">
              <div class="gallery-info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.year }}</p>
                <span class="view-icon"><i class="fas fa-search"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="lightbox" [class.active]="lightboxActive" (click)="closeLightbox()">
      <div class="lightbox-content" (click)="stopPropagation($event)" *ngIf="selectedItem">
        <div class="lightbox-header">
          <h3>{{ selectedItem.title }}</h3>
          <button class="close-btn" (click)="closeLightbox()"><i class="fas fa-times"></i></button>
        </div>
        <div class="lightbox-image">
          <img [src]="selectedItem.fullImage || selectedItem.thumbnail" [alt]="selectedItem.title">
        </div>
        <div class="lightbox-details">
          <p><strong>Category:</strong> {{ selectedItem.category }}</p>
          <p><strong>Year:</strong> {{ selectedItem.year }}</p>
          <p *ngIf="selectedItem.description">{{ selectedItem.description }}</p>
        </div>
        <div class="lightbox-nav">
          <button class="nav-btn prev" (click)="previousItem()"><i class="fas fa-chevron-left"></i></button>
          <button class="nav-btn next" (click)="nextItem()"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .gallery-item {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      height: 300px;
      cursor: pointer;
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

    .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }

    .gallery-info {
      text-align: center;
      color: var(--text-light);
      padding: 1rem;
    }

    .gallery-info h3 {
      margin-bottom: 0.5rem;
      color: var(--primary-color);
    }

    .view-icon {
      display: inline-block;
      margin-top: 1rem;
      width: 40px;
      height: 40px;
      background-color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .lightbox.active {
      opacity: 1;
      pointer-events: auto;
    }

    .lightbox-content {
      width: 90%;
      max-width: 1000px;
      background-color: var(--background-light);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .lightbox-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background-color: var(--background-dark);
      color: var(--text-light);
    }

    .lightbox-header h3 {
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-light);
      font-size: 1.5rem;
      cursor: pointer;
    }

    .lightbox-image {
      width: 100%;
      height: 500px;
    }

    .lightbox-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .lightbox-details {
      padding: 1.5rem;
    }

    .lightbox-nav {
      position: absolute;
      top: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
    }

    .nav-btn {
      width: 40px;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 40vh;
      }

      .hero-section h1 {
        font-size: 3rem;
      }

      .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }

      .lightbox-image {
        height: 350px;
      }
    }
  `]
})
export class GalleryComponent implements AfterViewInit {
  categories = [
    { label: 'All', value: 'all' },
    { label: 'Movies', value: 'movies' },
    { label: 'Events', value: 'events' },
    { label: 'Photoshoots', value: 'photoshoots' },
    { label: 'Behind the Scenes', value: 'behind-the-scenes' }
  ];

  galleryItems = [
    {
      title: 'The Last Dream - Promotional Photoshoot',
      thumbnail: 'https://images.pexels.com/photos/8273454/pexels-photo-8273454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/8273454/pexels-photo-8273454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'movies',
      year: '2023',
      description: 'Promotional photoshoot for the critically acclaimed film "The Last Dream".'
    },
    {
      title: 'International Film Awards',
      thumbnail: 'https://images.pexels.com/photos/1409958/pexels-photo-1409958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/1409958/pexels-photo-1409958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'events',
      year: '2023',
      description: 'Samantha at the International Film Awards where she won Best Actress for "The Last Dream".'
    },
    {
      title: 'Vogue Cover Shoot',
      thumbnail: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'photoshoots',
      year: '2023',
      description: 'Samantha featured on the cover of Vogue magazine.'
    },
    {
      title: 'Eternal Echoes - Movie Still',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'movies',
      year: '2022',
      description: 'A still from the film "Eternal Echoes" where Samantha played the role of Leila.'
    },
    {
      title: 'Golden Globe Awards',
      thumbnail: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'events',
      year: '2022',
      description: 'Samantha at the Golden Globe Awards ceremony.'
    },
    {
      title: 'Summer Fashion Editorial',
      thumbnail: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'photoshoots',
      year: '2022',
      description: 'Samantha for Elle magazine\'s summer fashion editorial.'
    },
    {
      title: 'Whispers in the Dark - Behind the Scenes',
      thumbnail: 'https://images.pexels.com/photos/7772593/pexels-photo-7772593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/7772593/pexels-photo-7772593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'behind-the-scenes',
      year: '2021',
      description: 'Behind the scenes from the filming of "Whispers in the Dark".'
    },
    {
      title: 'Charity Gala',
      thumbnail: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'events',
      year: '2021',
      description: 'Samantha hosting her annual charity gala for education initiatives.'
    },
    {
      title: 'Beyond Horizons - Movie Poster',
      thumbnail: 'https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'movies',
      year: '2020',
      description: 'Official poster for "Beyond Horizons" featuring Samantha as Ava.'
    },
    {
      title: 'Film Set - Director\'s Cut',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'behind-the-scenes',
      year: '2020',
      description: 'Samantha discussing a scene with the director on set.'
    },
    {
      title: 'Winter Collection Campaign',
      thumbnail: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'photoshoots',
      year: '2020',
      description: 'Samantha as the face of a luxury brand\'s winter collection.'
    },
    {
      title: 'The Silent Valley - Press Conference',
      thumbnail: 'https://images.pexels.com/photos/7234323/pexels-photo-7234323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullImage: 'https://images.pexels.com/photos/7234323/pexels-photo-7234323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'events',
      year: '2019',
      description: 'Samantha at the press conference for "The Silent Valley".'
    }
  ];

  activeCategory: string = 'all';
  filteredGalleryItems: any[] = this.galleryItems;
  lightboxActive: boolean = false;
  selectedItem: any = null;
  currentIndex: number = 0;

  ngAfterViewInit() {
    this.initAnimations();
  }

  filterGallery(category: string) {
    this.activeCategory = category;
    
    if (category === 'all') {
      this.filteredGalleryItems = this.galleryItems;
    } else {
      this.filteredGalleryItems = this.galleryItems.filter(item => item.category === category);
    }

    // Animate the filtered items
    GSAP.gsap.from('.gallery-item', {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power1.out',
      clearProps: 'all'
    });
  }

  openLightbox(item: any) {
    this.selectedItem = item;
    this.currentIndex = this.filteredGalleryItems.findIndex(i => i === item);
    this.lightboxActive = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeLightbox() {
    this.lightboxActive = false;
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  previousItem() {
    this.currentIndex = (this.currentIndex - 1 + this.filteredGalleryItems.length) % this.filteredGalleryItems.length;
    this.selectedItem = this.filteredGalleryItems[this.currentIndex];
  }

  nextItem() {
    this.currentIndex = (this.currentIndex + 1) % this.filteredGalleryItems.length;
    this.selectedItem = this.filteredGalleryItems[this.currentIndex];
  }

  initAnimations() {
    GSAP.gsap.from('.gallery-item', {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%'
      }
    });
  }
}