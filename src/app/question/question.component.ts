import { Component } from '@angular/core';
import { interval, Observable } from "rxjs";
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  name: string = '';
  questionList: any[] = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 30;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$?: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;

  constructor(
     questionService: QuestionService
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name') || '';
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res: any) => {
      this.questionList = res.questions;
    })
  };

  nextQuestion() {
    this.currentQuestion += 1;
  }

  previousQuestion() {
    this.currentQuestion -= 1;
  }

  answer(currentQno: number, option: any) {
    if (currentQno > this.questionList.length - 1) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    if (option.correct) {
      this.points += 5;
      this.correctAnswer++;
    } else {
      this.inCorrectAnswer++
    }
    setTimeout(() => {
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercent();
    }, 1000);
  }

  private startCounter() {
    /**
     * (DECR by zero seems unnecessary, so not implementing) */
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 30;
        }
      });

    if (this.counter == 0) {
      this.currentQuestion++;
      this.resetCounter();
    }

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  private stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0
  };

  private resetCounter() {
    this.stopCounter();
    this.counter = 30;
    this.startCounter();
  };

  private getProgressPercent() {
    /** Create a getProgressPercent() method that 
     * assigns progress to the current question divided 
     * by number of questions, multiplies it by 100 and 
     * returns progress.  */
    let percent = this.currentQuestion / this.questionList.length * 100;

  };

  private clear() {
    this.points = 0;
    this.counter = 30;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.clear();
  }



}

