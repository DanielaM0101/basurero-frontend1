import { Injectable } from '@angular/core';

interface Message {
  type: 'success' | 'error' | 'info';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageInfo: Message | null = null;

  message(): Message | null {
    return this.messageInfo;
  }

  success(content: string): void {
    this.setMessage('success', content);
  }

  error(content: string): void {
    this.setMessage('error', content);
  }

  info(content: string): void {
    this.setMessage('info', content);
  }

  private setMessage(type: 'success' | 'error' | 'info', content: string): void {
    this.messageInfo = { type, content };
    setTimeout(() => this.clear(), 3000); // Clear message after 3 seconds
  }

  private clear(): void {
    this.messageInfo = null;
  }
}
