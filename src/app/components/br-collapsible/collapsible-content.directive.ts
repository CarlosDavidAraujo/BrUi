import { Directive, inject } from '@angular/core';
import { BrCollapsibleDirective } from './collapsible.directive';

@Directive({
  selector: '[brCollapsibleContent]',
  standalone: true,
  host: {
    // 1. Aplica o ID gerado pelo pai. Essencial para o aria-controls do trigger.
    '[id]': 'collapsible.contentId',

    // 2. Aplica o data-state para controlar as animações de abrir/fechar.
    '[attr.data-state]': 'collapsible.dataState()',

    // 3. Garante que o conteúdo seja removido da árvore de acessibilidade quando fechado.
    '[hidden]': '!collapsible.open()',
  },
})
export class BrCollapsibleContentDirective {
  // Injeta a diretiva pai para acessar seu estado e propriedades.
  protected readonly collapsible = inject(BrCollapsibleDirective);
}
