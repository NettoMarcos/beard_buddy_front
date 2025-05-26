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

  private baseUrl = 'https://workflowwebhook.hospcom.net/webhook/iaproject'; 

  constructor(private http: HttpClient) { }

 enviarMensagem(message: ChatBotMessage): Observable<string> {
  return this.http.post(this.baseUrl, message, { responseType: 'text' });
}
}
  