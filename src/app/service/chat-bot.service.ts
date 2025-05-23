import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChatBotMessage {
  message: string;
}

export interface ChatBotResponse {
  output: string;
}


@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private baseUrl = 'https://workflow.hospcom.net/webhook-test/iaproject'; 

  constructor(private http: HttpClient) { }

  enviarMensagem(message: ChatBotMessage): Observable<ChatBotResponse>{
    return this.http.post<ChatBotResponse>(this.baseUrl, message);
  }
}
  