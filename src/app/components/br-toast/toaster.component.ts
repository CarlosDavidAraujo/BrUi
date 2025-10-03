import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrToastService } from './toast.service';
import { BrToastComponent } from './toast.component'; // Criaremos a seguir

@Component({
  selector: 'br-toaster',
  standalone: true,
  imports: [BrToastComponent], // Importa o componente que ele irá renderizar
  template: `
    @for (toast of toasts(); track toast.id) {
    <br-toast [data]="toast" (closeRequest)="onToastClose($event)"></br-toast>
    }
  `,
  host: {
    // 3. Estilos para posicionar o container no canto da tela
    class: 'fixed top-6 right-6 z-50 flex flex-col gap-3',
    // 4. Atributos de acessibilidade cruciais
    role: 'region',
    'aria-live': 'polite',
    'aria-label': 'Notificações',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrToasterComponent {
  private readonly toastService = inject(BrToastService);

  // Expõe o signal de toasts do serviço para o template
  protected readonly toasts = this.toastService.toasts;

  // Quando um toast filho emite um evento de fechamento,
  // passamos o comando para o serviço.
  protected onToastClose(id: string): void {
    this.toastService.close(id);
  }
}
