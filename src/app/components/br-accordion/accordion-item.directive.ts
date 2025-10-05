import { Directive, computed, inject, input } from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

@Directive({
  selector: '[brAccordionItem], br-accordion-item',
  standalone: true,
  exportAs: 'brAccordionItem',
  hostDirectives: [
    {
      directive: CdkAccordionItem,
      inputs: ['expanded', 'disabled'],
      outputs: ['opened', 'closed', 'destroyed'],
    },
  ],
  host: {
    '[attr.data-state]': 'state',
    '[class.br-accordion-item]': 'true',
    '[class]': 'finalClass()',
  },
})
export class BrAccordionItemDirective /* implements FocusableOption  */ {
  private readonly cdkItem = inject(CdkAccordionItem);

  private readonly class =
    'flex flex-col border-b border-border first:border-t';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClass = computed(() => cn(this.class, this.customClass()));

  readonly triggerId = `${this.cdkItem.id}-trigger`;
  readonly contentId = `${this.cdkItem.id}-content`;

  get state() {
    return this.cdkItem.expanded ? 'open' : 'closed';
  }

  get disabled(): boolean {
    return this.cdkItem.disabled;
  }

  open(): void {
    this.cdkItem.open();
  }
  close(): void {
    this.cdkItem.close();
  }
  toggle(): void {
    this.cdkItem.toggle();
  }
}
