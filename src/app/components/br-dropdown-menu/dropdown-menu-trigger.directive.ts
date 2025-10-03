import { Directive, ElementRef, inject } from '@angular/core';
import { BrDropdownMenuComponent } from './dropdown-menu.component';

@Directive({
  selector: '[brDropdownMenuTrigger]',
  standalone: true,
  host: {
    '(click)': 'menu.toggle()',
    '[attr.aria-haspopup]': "'menu'",
    '[attr.aria-expanded]': 'menu.isOpen()',
  },
})
export class BrDropdownMenuTriggerDirective {
  // Injeta a instância do componente pai <br-dropdown-menu>
  protected readonly menu = inject(BrDropdownMenuComponent);
  readonly elementRef = inject(ElementRef<HTMLElement>);
}
