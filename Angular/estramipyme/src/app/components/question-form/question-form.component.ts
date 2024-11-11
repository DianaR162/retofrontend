import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questions: any[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe({
      next: (data) => this.questions = data,
      error: (err) => console.error('Error fetching questions:', err)
    });
  }
}
