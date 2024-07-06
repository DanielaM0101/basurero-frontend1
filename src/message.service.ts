import { Injectable, signal } from '@angular/core';

export interface Message {
  type: 'success' | 'error' | 'info';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSignal = signal<Message | null>(null);

  get message() {
    return this.messageSignal.asReadonly();
  }

  success(content: string) {
    this.messageSignal.set({ type: 'success', content });
    this.clearMessageAfterDelay();
  }

  error(content: string) {
    this.messageSignal.set({ type: 'error', content });
    this.clearMessageAfterDelay();
  }

  info(content: string) {
    this.messageSignal.set({ type: 'info', content });
    this.clearMessageAfterDelay();
  }

  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.messageSignal.set(null);
    }, 3000);
  }
}