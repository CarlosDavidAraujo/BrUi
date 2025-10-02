import { Directive, inject } from '@angular/core';
import { BrDialogDirective } from './dialog.directive';

@Directive({
  selector: '[brDialogClose]',
  standalone: true,
  host: {
    // Ouve o evento de clique e chama o método 'close' do diálogo pai.
    '(click)': 'dialog.close()',
    class:
      'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400',
  },
})
export class BrDialogCloseDirective {
  // Injeta a instância da diretiva pai, mesmo estando dentro de um <ng-template>.
  // A Injeção de Dependência do Angular resolve isso para nós.
  protected readonly dialog = inject(BrDialogDirective);
}
