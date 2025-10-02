import { Directive, inject } from '@angular/core';
import { BrCollapsibleDirective } from './collapsible.directive';

@Directive({
  selector: 'button[brCollapsibleTrigger]',
  standalone: true,
  host: {
    // --- Comportamento ---
    '(click)': 'collapsible.toggle()',

    // --- Acessibilidade (ARIA) ---
    '[attr.aria-expanded]': 'collapsible.open()',
    '[attr.aria-controls]': 'collapsible.contentId',

    // --- Estilização ---
    '[attr.data-state]': 'collapsible.dataState()',
  },
})
export class BrCollapsibleTriggerDirective {
  // 1. Injeta a diretiva pai para acessar seu estado e métodos
  protected readonly collapsible = inject(BrCollapsibleDirective);
}
