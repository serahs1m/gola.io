import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [
    {
      domain: 'Algebra',
      difficulty: 'Easy',
      skill: 'Linear equations in one variable',
      question: 'If 2x + 3 = 9, what is the value of 6x - 1?',
      answer: '17',
      explanation: 'Solve 2x + 3 = 9 to get x = 3. Then 6x - 1 = 18 - 1 = 17.'
    },
    {
      domain: 'Algebra',
      difficulty: 'Medium',
      skill: 'Linear equations in two variables',
      question: 'If x + y = 10 and x - y = 2, what is x?',
      answer: '6',
      explanation: 'Add the equations: (x + y) + (x - y) = 10 + 2 → 2x = 12 → x = 6.'
    }
  ];

  getQuestionsBySkill(skill: string): Question[] {
    return this.questions.filter(q => q.skill.toLowerCase() === skill.toLowerCase());
  }
}
