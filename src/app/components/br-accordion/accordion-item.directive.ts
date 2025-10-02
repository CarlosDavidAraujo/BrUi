import {
  Directive,
  computed,
  signal,
  forwardRef,
  ElementRef, // Importar ElementRef
  inject, // Importar inject
} from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { FocusableOption } from '@angular/cdk/a11y';

export type AccordionItemState = 'open' | 'closed';

// Um contador simples para gerar IDs únicos
let nextId = 0;

@Directive({
  selector: '[brAccordionItem]',
  standalone: true,
  exportAs: 'brAccordionItem',
  hostDirectives: [CdkAccordionItem],
  host: {
    '[attr.data-state]': 'state()',
    '[class.br-accordion-item]': 'true',
    class: 'border border-slate-200 rounded-md',
    // O CDK já adiciona o [id], mas podemos ser explícitos se quisermos
  },
})
export class BrAccordionItemDirective implements FocusableOption {
  private readonly cdkItem = inject(CdkAccordionItem);

  // Geramos IDs únicos para vincular o trigger e o content
  readonly id = `br-accordion-item-${nextId++}`;
  readonly triggerId = `${this.id}-trigger`;
  readonly contentId = `${this.id}-content`;

  // O CDK gerencia o estado de expandido, nós apenas o refletimos como um signal.
  // Isso garante sincronia total com o CDK.
  readonly #expanded = signal<boolean>(this.cdkItem.expanded);

  readonly state = computed<AccordionItemState>(() =>
    this.#expanded() ? 'open' : 'closed'
  );

  private triggerElement: HTMLElement | null = null;

  constructor() {
    // Mantemos nosso signal sincronizado com as mudanças do CDK
    this.cdkItem.opened.subscribe(() => this.#expanded.set(true));
    this.cdkItem.closed.subscribe(() => this.#expanded.set(false));
  }

  // API pública que delega para o CDK
  open(): void {
    this.cdkItem.open();
  }
  close(): void {
    this.cdkItem.close();
  }
  toggle(): void {
    this.cdkItem.toggle();
  }

  // Método para o trigger se registrar
  registerTrigger(element: HTMLElement): void {
    this.triggerElement = element;
  }

  // Implementação da interface FocusableOption
  focus() {
    this.triggerElement?.focus();
  }
}
