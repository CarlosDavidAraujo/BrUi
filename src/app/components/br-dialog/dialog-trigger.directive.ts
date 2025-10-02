import { Directive, inject } from '@angular/core';
import { BrDialogDirective } from './dialog.directive';

@Directive({
  selector: '[brDialogTrigger]',
  standalone: true,
  host: {
    // 1. Ouve o evento de clique no elemento hospedeiro
    '(click)': 'dialog.open()',

    // 2. Adiciona atributos de acessibilidade (ARIA)
    '[attr.aria-haspopup]': "'dialog'",
    '[attr.aria-expanded]': 'dialog.isOpen()',
    class:
      'rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  },
})
export class BrDialogTriggerDirective {
  // 3. Injeta a instância da diretiva pai para poder controlá-la
  protected readonly dialog = inject(BrDialogDirective, { host: true });
}
