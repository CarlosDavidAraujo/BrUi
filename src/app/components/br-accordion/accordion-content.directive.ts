import { Directive, inject } from '@angular/core';
import { BrAccordionItemDirective } from './accordion-item.directive';

@Directive({
  selector: '[brAccordionContent]',
  standalone: true,
  host: {
    // --- Acessibilidade (A11y) ---
    role: 'region',
    '[attr.id]': 'item.contentId',
    '[attr.aria-labelledby]': 'item.triggerId',

    // --- Estado e Visibilidade ---
    '[attr.data-state]': 'item.state()',
    '[hidden]': 'item.state() === "closed"',
    class:
      'overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  },
})
export class BrAccordionContentDirective {
  protected readonly item = inject(BrAccordionItemDirective);
}
