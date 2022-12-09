import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  http: any;

  constructor(http: HttpClient) { }

  getQuestionJson(){
    return this.http.get("assets/questions.json");
  }

}
