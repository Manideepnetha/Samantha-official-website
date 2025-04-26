import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmographyComponent } from './pages/filmography/filmography.component';
import { AwardsComponent } from './pages/awards/awards.component';
import { CharityComponent } from './pages/charity/charity.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { QuizComponent } from './pages/quiz/quiz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filmography', component: FilmographyComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'charity', component: CharityComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];