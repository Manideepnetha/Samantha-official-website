import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="hero-section">
      <div class="container">
        <h1>Fan Quiz</h1>
        <p>Test your knowledge of Samantha and her career</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="quiz-container" *ngIf="!quizCompleted">
          <div class="quiz-progress">
            <div class="progress-bar">
              <div class="progress" [style.width]="(currentQuestion + 1) / questions.length * 100 + '%'"></div>
            </div>
            <div class="progress-text">Question {{ currentQuestion + 1 }} of {{ questions.length }}</div>
          </div>

          <div class="question-container">
            <h2 class="question">{{ questions[currentQuestion].text }}</h2>
            
            <div class="options">
              <div 
                *ngFor="let option of questions[currentQuestion].options; let i = index" 
                class="option"
                [class.selected]="selectedOption === i"
                [class.correct]="showAnswer && i === questions[currentQuestion].correct"
                [class.incorrect]="showAnswer && selectedOption === i && i !== questions[currentQuestion].correct"
                (click)="selectOption(i)">
                <div class="option-text">{{ option }}</div>
              </div>
            </div>

            <div class="feedback" *ngIf="showAnswer">
              <div class="feedback-text" [class.correct-feedback]="isCorrect" [class.incorrect-feedback]="!isCorrect">
                <i class="fas" [class.fa-check-circle]="isCorrect" [class.fa-times-circle]="!isCorrect"></i>
                {{ isCorrect ? 'Correct!' : 'Incorrect!' }} {{ questions[currentQuestion].feedback }}
              </div>
            </div>

            <div class="button-container">
              <button *ngIf="!showAnswer" class="btn" (click)="checkAnswer()" [disabled]="selectedOption === null">Submit Answer</button>
              <button *ngIf="showAnswer" class="btn" (click)="nextQuestion()">
                {{ currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results' }}
              </button>
            </div>
          </div>
        </div>

        <div class="results-container" *ngIf="quizCompleted">
          <h2>Quiz Results</h2>
          
          <div class="score-display">
            <div class="score-circle">
              <span class="score-value">{{ scorePercentage }}%</span>
            </div>
            <p class="score-text">You answered {{ score }} out of {{ questions.length }} questions correctly!</p>
          </div>
          
          <div class="result-message">
            <h3>{{ getFeedbackMessage() }}</h3>
            <p>{{ getFeedbackDescription() }}</p>
          </div>
          
          <div class="share-container">
            <h3>Share your results:</h3>
            <div class="social-icons">
              <a href="javascript:void(0)" class="social-share" (click)="shareResults('twitter')"><i class="fab fa-twitter"></i></a>
              <a href="javascript:void(0)" class="social-share" (click)="shareResults('facebook')"><i class="fab fa-facebook-f"></i></a>
              <a href="javascript:void(0)" class="social-share" (click)="shareResults('instagram')"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <button class="btn" (click)="restartQuiz()">Take the Quiz Again</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3062542/pexels-photo-3062542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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

    .quiz-container, .results-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: var(--background-light);
      border-radius: 10px;
      padding: 2rem;
      box-shadow: var(--shadow);
    }

    .quiz-progress {
      margin-bottom: 2rem;
    }

    .progress-bar {
      height: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress {
      height: 100%;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    .progress-text {
      text-align: right;
      font-size: 0.9rem;
      color: #777;
    }

    .question {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .options {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .option {
      padding: 1.2rem;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }

    .option:hover:not(.selected):not(.correct):not(.incorrect) {
      border-color: var(--accent-color);
      transform: translateY(-2px);
    }

    .option.selected {
      border-color: var(--accent-color);
      background-color: rgba(138, 43, 226, 0.1);
    }

    .option.correct {
      border-color: #4CAF50;
      background-color: rgba(76, 175, 80, 0.1);
    }

    .option.incorrect {
      border-color: #F44336;
      background-color: rgba(244, 67, 54, 0.1);
    }

    .option-text {
      flex: 1;
    }

    .feedback {
      margin-bottom: 2rem;
    }

    .feedback-text {
      padding: 1rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .correct-feedback {
      background-color: rgba(76, 175, 80, 0.1);
      color: #4CAF50;
    }

    .incorrect-feedback {
      background-color: rgba(244, 67, 54, 0.1);
      color: #F44336;
    }

    .button-container {
      text-align: center;
    }

    .results-container h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .score-display {
      text-align: center;
      margin-bottom: 2rem;
    }

    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .score-value {
      font-size: 2.5rem;
      font-weight: 700;
    }

    .score-text {
      font-size: 1.2rem;
    }

    .result-message {
      text-align: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: rgba(0, 0, 0, 0.03);
      border-radius: 8px;
    }

    .result-message h3 {
      color: var(--accent-color);
      margin-bottom: 1rem;
    }

    .share-container {
      text-align: center;
      margin-bottom: 2rem;
    }

    .share-container h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .social-share {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: var(--background-dark);
      color: var(--text-light);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.5rem;
      transition: all 0.3s ease;
    }

    .social-share:hover {
      transform: translateY(-3px);
      background-color: var(--primary-color);
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 40vh;
      }

      .hero-section h1 {
        font-size: 3rem;
      }

      .question {
        font-size: 1.5rem;
      }
    }
  `]
})
export class QuizComponent {
  questions = [
    {
      text: 'What was Samantha\'s breakout role?',
      options: ['Maya in "The Last Dream"', 'Leila in "Eternal Echoes"', 'Sarah in "Whispers in the Dark"', 'Emma in "The Silent Valley"'],
      correct: 3,
      feedback: 'Samantha\'s role as Emma in "The Silent Valley" launched her career in 2019.'
    },
    {
      text: 'Which award did Samantha win for her performance in "Eternal Echoes"?',
      options: ['Academy Award', 'Golden Globe', 'Critics Choice Award', 'International Film Award'],
      correct: 2,
      feedback: 'She won the Critics Choice Award for her compelling performance as Leila.'
    },
    {
      text: 'What is the name of Samantha\'s foundation?',
      options: ['Samantha Foundation', 'Bright Futures', 'Hope Initiative', 'Rising Stars'],
      correct: 0,
      feedback: 'The Samantha Foundation was established in 2018 to support education, healthcare, and women\'s empowerment.'
    },
    {
      text: 'Which director has Samantha worked with the most?',
      options: ['Christopher Nolan', 'Jane Campion', 'David Fincher', 'Sofia Coppola'],
      correct: 1,
      feedback: 'Jane Campion and Samantha have collaborated on three successful films.'
    },
    {
      text: 'In which TV series did Samantha play Detective Lisa Morgan?',
      options: ['Midnight Chronicles', 'City Lights', 'The Last Summer', 'Beyond Horizons'],
      correct: 1,
      feedback: 'Samantha portrayed Detective Lisa Morgan in the critically acclaimed series "City Lights".'
    },
    {
      text: 'Which charity cause is NOT one of Samantha\'s primary focuses?',
      options: ['Education', 'Women\'s Empowerment', 'Animal Welfare', 'Children\'s Welfare'],
      correct: 2,
      feedback: 'While Samantha supports many causes, her primary focus is on education, women\'s empowerment, and children\'s welfare.'
    },
    {
      text: 'What year did Samantha win her first major award?',
      options: ['2018', '2019', '2020', '2021'],
      correct: 1,
      feedback: 'She won her first major award in 2019 for "The Silent Valley".'
    },
    {
      text: 'Which famous magazine featured Samantha on their cover in 2023?',
      options: ['Time', 'Vogue', 'Elle', 'Vanity Fair'],
      correct: 1,
      feedback: 'Samantha was featured on the cover of Vogue magazine in 2023.'
    },
    {
      text: 'What is the name of Samantha\'s character in "Beyond Horizons"?',
      options: ['Maya', 'Leila', 'Ava', 'Sarah'],
      correct: 2,
      feedback: 'She played the role of Ava in "Beyond Horizons" in 2020.'
    },
    {
      text: 'Which of these is one of the flagship programs of The Samantha Foundation?',
      options: ['Green Earth', 'Bright Future Scholarships', 'Animal Rescue', 'Sports for Youth'],
      correct: 1,
      feedback: 'Bright Future Scholarships is one of the foundation\'s flagship programs, providing educational support for underprivileged children.'
    }
  ];

  currentQuestion: number = 0;
  selectedOption: number | null = null;
  showAnswer: boolean = false;
  isCorrect: boolean = false;
  score: number = 0;
  quizCompleted: boolean = false;
  scorePercentage: number = 0;

  selectOption(index: number) {
    if (!this.showAnswer) {
      this.selectedOption = index;
    }
  }

  checkAnswer() {
    if (this.selectedOption !== null) {
      this.showAnswer = true;
      this.isCorrect = this.selectedOption === this.questions[this.currentQuestion].correct;
      
      if (this.isCorrect) {
        this.score++;
      }
    }
  }

  nextQuestion() {
    this.showAnswer = false;
    this.selectedOption = null;
    
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    } else {
      this.completeQuiz();
    }
  }

  completeQuiz() {
    this.quizCompleted = true;
    this.scorePercentage = Math.round((this.score / this.questions.length) * 100);
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.selectedOption = null;
    this.showAnswer = false;
    this.isCorrect = false;
    this.score = 0;
    this.quizCompleted = false;
    this.scorePercentage = 0;
  }

  getFeedbackMessage() {
    if (this.scorePercentage >= 90) {
      return 'Ultimate Fan!';
    } else if (this.scorePercentage >= 70) {
      return 'Devoted Fan!';
    } else if (this.scorePercentage >= 50) {
      return 'Casual Fan!';
    } else {
      return 'Novice Fan!';
    }
  }

  getFeedbackDescription() {
    if (this.scorePercentage >= 90) {
      return 'Amazing! You know almost everything about Samantha. You must be her biggest fan!';
    } else if (this.scorePercentage >= 70) {
      return 'Great job! You\'re definitely a devoted fan with impressive knowledge of Samantha\'s career.';
    } else if (this.scorePercentage >= 50) {
      return 'Not bad! You have a good grasp of Samantha\'s work, but there\'s still more to discover.';
    } else {
      return 'You\'re just beginning your journey as a fan. Explore more of Samantha\'s work and try again!';
    }
  }

  shareResults(platform: string) {
    const message = `I scored ${this.scorePercentage}% on the Samantha Fan Quiz! I'm a ${this.getFeedbackMessage().toLowerCase()} Check out her official website and take the quiz yourself!`;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll just copy to clipboard
        navigator.clipboard.writeText(message);
        alert('Message copied to clipboard! Paste it in your Instagram post.');
        return;
    }
    
    window.open(url, '_blank');
  }
}