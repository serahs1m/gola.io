import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './question-viewer.component.html',
  styleUrls: ['./question-viewer.component.css']
})
export class QuestionViewerComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;          
  viewedIndexes: Set<number> = new Set(); 

  userAnswer = '';
  feedback = '';
  showAnswer = false;
  incorrectCount = 0;

  skillSlug = '';
  difficultySlug = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  ngOnInit(): void {
    this.skillSlug      = this.route.snapshot.paramMap.get('skill')      || '';
    this.difficultySlug = this.route.snapshot.paramMap.get('difficulty') || '';

    this.http.get<any[]>('assets/sat_data.json').subscribe(data => {
      let matching = data.filter(q => this.toSlug(q.skill) === this.skillSlug);

      if (this.difficultySlug !== 'random') {
        matching = matching.filter(
          q => q.difficulty.toLowerCase() === this.difficultySlug
        );
      }

      this.questions = matching;

      this.pickNextQuestion();
    });
  }

  checkAnswer() {
    const correct = String(this.questions[this.currentQuestionIndex].answer).trim();
    if (this.userAnswer.trim() === correct) {
      this.feedback   = '정답입니다! 🎉';
      this.showAnswer = true;
    } else {
      this.incorrectCount++;
      this.feedback = `오답입니다. 다시 시도해보세요. (${this.incorrectCount}/3)`;
    }
  }

  showHint() {
    this.showAnswer = true;
  }

  nextQuestion() {
    this.userAnswer      = '';
    this.feedback        = '';
    this.showAnswer      = false;
    this.incorrectCount  = 0;

    this.pickNextQuestion();
  }

  private pickNextQuestion() {
    if (!this.questions.length) return;

    const remaining = this.questions
      .map((_, idx) => idx)
      .filter(idx => !this.viewedIndexes.has(idx));

    if (remaining.length === 0) {
      this.feedback = '🎉 선택한 난이도의 모든 문제를 풀었습니다!';
      return;
    }

    const randIdx = remaining[Math.floor(Math.random() * remaining.length)];
    this.currentQuestionIndex = randIdx;
    this.viewedIndexes.add(randIdx);
  }

  get progressNumber(): number {
    return this.viewedIndexes.size;
  }
}
