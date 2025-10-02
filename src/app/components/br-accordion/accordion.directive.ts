// accordion.directive.ts

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  QueryList,
  input,
  inject,
  effect,
  booleanAttribute,
  viewChildren,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkAccordion } from '@angular/cdk/accordion';
import { BrAccordionItemDirective } from './accordion-item.directive';

@Directive({
  selector: '[brAccordion]',
  standalone: true,
  hostDirectives: [CdkAccordion],
  host: {
    class: 'w-full max-w-lg mx-auto space-y-2 font-san',
  },
})
export class BrAccordionDirective implements AfterContentInit {
  // 3. Adicionar o input para controlar o modo
  readonly mode = input<'single' | 'multiple'>('single');

  // 4. Injetar a instância do CdkAccordion do nosso próprio host
  private readonly cdkAccordion = inject(CdkAccordion, { self: true });

  private readonly items = viewChildren(BrAccordionItemDirective);

  private keyManager!: FocusKeyManager<BrAccordionItemDirective>;

  constructor() {
    // 5. Usar um effect para sincronizar nosso input com a propriedade do CDK
    effect(() => {
      this.cdkAccordion.multi = this.mode() === 'multiple';
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items()).withWrap();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      return;
    }
    this.keyManager.onKeydown(event);
  }
}
