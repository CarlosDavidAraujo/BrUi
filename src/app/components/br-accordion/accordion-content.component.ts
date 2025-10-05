import { Component, computed, Directive, inject, input } from '@angular/core';
import { BrAccordionItemDirective } from './accordion-item.directive';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'br-accordion-content',
  standalone: true,
  template: `<div [class]="finalClass()"><ng-content /></div>`,
  host: {
    // --- Acessibilidade (A11y) ---
    role: 'region',
    '[attr.id]': 'item.contentId',
    '[attr.aria-labelledby]': 'item.triggerId',

    // --- Estado e Visibilidade ---
    '[attr.data-state]': 'item.state',
    '[hidden]': 'item.state === "closed"',
    class:
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  },
})
export class BrAccordionContentDirective {
  protected readonly item = inject(BrAccordionItemDirective);

  customClass = input<ClassValue>('', { alias: 'class' });
  finalClass = computed(() => cn('pb-4 pl-16 pt-0', this.customClass()));
}
