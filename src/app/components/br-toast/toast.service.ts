import { Injectable, inject, signal } from '@angular/core';
import { ToastData, ToastOptions } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class BrToastService {
  // 1. Um signal que atuará como a "fila" de toasts visíveis.
  //    O componente <br-toaster> irá ler este signal.
  readonly toasts = signal<ToastData[]>([]);

  private toastIdCounter = 0;

  /**
   * API pública para mostrar um novo toast.
   * @param options As configurações para o toast.
   */
  show(options: ToastOptions): void {
    const newToast = this.createToastData(options);

    // Adiciona o novo toast à lista.
    this.toasts.update((currentToasts) => [...currentToasts, newToast]);

    // Agenda o fechamento automático do toast.
    newToast.timeoutId = setTimeout(
      () => this.close(newToast.id),
      newToast.duration
    );
  }

  /**
   * API pública para fechar um toast programaticamente.
   * @param id O ID do toast a ser fechado.
   */
  close(id: string): void {
    this.toasts.update((currentToasts) => {
      // Antes de remover, limpa o timeout para evitar erros.
      const toastToClose = currentToasts.find((t) => t.id === id);
      if (toastToClose?.timeoutId) {
        clearTimeout(toastToClose.timeoutId);
      }
      return currentToasts.filter((t) => t.id !== id);
    });
  }

  /**
   * Método interno para criar o objeto de dados do toast,
   * mesclando as opções do usuário com valores padrão.
   */
  private createToastData(options: ToastOptions): ToastData {
    const id = `br-toast-${this.toastIdCounter++}`;
    return {
      id,
      type: options.type ?? 'info',
      title: options.title ?? '',
      message: options.message,
      duration: options.duration ?? 5000, // 5 segundos por padrão
    };
  }
}
