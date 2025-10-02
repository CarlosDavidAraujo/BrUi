import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { BrAccordionItemDirective } from './accordion-item.directive';
import { BrAccordionDirective } from './accordion.directive';

@Directive({
  selector: '[brAccordionTrigger]',
  standalone: true,
  host: {
    // --- Comportamento ---
    type: 'button', // Garante que não submeta forms
    '(click)': 'item.toggle()',
    '(keydown)': 'accordion?.handleKeyDown($event)',
    class:
      'flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=open]:bg-slate-50',

    // --- Acessibilidade (A11y) ---
    '[attr.id]': 'item.triggerId',
    '[attr.data-state]': 'item.state()',
    '[attr.aria-expanded]': 'item.state() === "open"',
    '[attr.aria-controls]': 'item.contentId',
    '[attr.tabindex]': '0',
  },
})
export class BrAccordionTriggerDirective implements OnInit {
  protected readonly item = inject(BrAccordionItemDirective);
  // Usamos { optional: true } pois um acordeão pode ter um só item,
  // e nesse caso a diretiva container não é estritamente necessária.
  protected readonly accordion = inject(BrAccordionDirective, {
    optional: true,
  });
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    // É seguro interagir com a diretiva 'item' aqui.
    this.item.registerTrigger(this.elementRef.nativeElement);
  }
}
