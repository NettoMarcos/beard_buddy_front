import { Component } from '@angular/core';
import {
  ChatBotMessage,
  ChatBotService,
} from 'src/app/service/chat-bot.service';

@Component({
  selector: 'app-buddy-chat',
  templateUrl: './buddy-chat.component.html',
  styleUrls: ['./buddy-chat.component.scss'],
})
export class BuddyChatComponent {
  isOpen = false;
  messages: string[] = [];
  inputMessage = '';
  isLoading = false;

  constructor(private chatBotService: ChatBotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const msg = this.inputMessage.trim();
    if (!msg || this.isLoading) return;

    this.messages.push('Você: ' + msg);
    this.inputMessage = '';
    this.isLoading = true;

    const payload: ChatBotMessage = { message: msg };

    this.chatBotService.enviarMensagem(payload).subscribe({
      next: (res) => {
       
          let outputText = res
            .replace(/^\{\s*"output"\s*:\s*"?/, '') // remove '{ "output":' e aspas duplas se houver
            .replace(/"\s*\}\s*$/, '') // remove aspa final e }
            .trim();

          this.messages.push('Buddy: ' + outputText);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem:', err);
        this.messages.push('Bot: Desculpe, ocorreu um erro ao responder.');
        this.isLoading = false;
      },
    });
  }
}
