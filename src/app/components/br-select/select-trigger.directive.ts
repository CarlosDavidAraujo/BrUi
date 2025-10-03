import { Directive, ElementRef, inject } from '@angular/core';
import { BrSelectComponent } from './select.component';

@Directive({
  selector: 'button[brSelectTrigger]',
  standalone: true,
  host: {
    '(click)': 'select.toggle()',
    '[attr.aria-haspopup]': "'listbox'",
    '[attr.aria-expanded]': 'select.isOpen()',
    '[attr.data-state]': 'select.isOpen() ? "open" : "closed"',
  },
})
export class BrSelectTriggerDirective {
  // Injeta a instância do componente pai <br-select>
  protected readonly select = inject(BrSelectComponent);

  readonly elementRef = inject(ElementRef<HTMLElement>);
}
