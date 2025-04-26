import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mock swiper implementation since we can't import the real one in this environment
class MockSwiper {
  constructor(
    private container: HTMLElement,
    private options: any
  ) {
    this.init();
  }

  private init() {
    const slides = this.container.querySelectorAll('.swiper-slide');
    const slideWidth = 100 / (this.options.slidesPerView || 3);
    
    slides.forEach((slide: Element) => {
      // Type assertion to treat `slide` as HTMLElement
      const htmlSlide = slide as HTMLElement;
      htmlSlide.style.width = `${slideWidth}%`;
    });
    

    // Add navigation functionality
    const prevBtn = this.container.querySelector('.swiper-button-prev');
    const nextBtn = this.container.querySelector('.swiper-button-next');
    const wrapper = this.container.querySelector('.swiper-wrapper') as HTMLElement;
    
    let currentPosition = 0;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
          currentPosition -= 1;
          wrapper.style.transform = `translateX(-${currentPosition * slideWidth}%)`;
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxPosition = slides.length - (this.options.slidesPerView || 3);
        if (currentPosition < maxPosition) {
          currentPosition += 1;
          wrapper.style.transform = `translateX(-${currentPosition * slideWidth}%)`;
        }
      });
    }
  }
}

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="swiper-container" #swiperContainer>
      <div class="swiper-wrapper">
        <div class="swiper-slide" *ngFor="let slide of slides">
          <div class="slide-content">
            <img [src]="slide.image" [alt]="slide.title">
            <div class="slide-info">
              <h3>{{ slide.title }}</h3>
              <p><strong>Role:</strong> {{ slide.role }}</p>
              <p><strong>Year:</strong> {{ slide.year }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  `,
  styles: [`
    .swiper-container {
      width: 100%;
      overflow: hidden;
      position: relative;
      padding: 0 50px;
    }

    .swiper-wrapper {
      display: flex;
      transition: transform 0.3s ease;
    }

    .swiper-slide {
      flex-shrink: 0;
      padding: 10px;
    }

    .slide-content {
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--shadow);
      background-color: var(--background-light);
      height: 100%;
    }

    .slide-content img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .slide-info {
      padding: 1.5rem;
      color: var(--text-color);
    }

    .slide-info h3 {
      margin-top: 0;
      color: var(--accent-color);
    }

    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background-color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      z-index: 10;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
    }

    .swiper-button-prev {
      left: 0;
    }

    .swiper-button-prev::after {
      content: "\\f104";
    }

    .swiper-button-next {
      right: 0;
    }

    .swiper-button-next::after {
      content: "\\f105";
    }

    @media (max-width: 992px) {
      .slide-content img {
        height: 250px;
      }
    }

    @media (max-width: 768px) {
      .swiper-container {
        padding: 0 40px;
      }
    }
  `]
})
export class SwiperComponent implements AfterViewInit {
  @Input() slides: any[] = [];
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  ngAfterViewInit() {
    // Initialize mock swiper
    setTimeout(() => {
      new MockSwiper(this.swiperContainer.nativeElement, {
        slidesPerView: window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    }, 0);
  }
}