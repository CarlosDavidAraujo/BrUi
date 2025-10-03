import { Directive, ElementRef, inject } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { BrDropdownMenuComponent } from './dropdown-menu.component';

@Directive({
  selector: '[brDropdownMenuItem]',
  standalone: true,
  host: {
    role: 'menuitem',
    tabindex: '-1', // Permite foco programático, mas não via tecla Tab
    '(click)': 'menu.close()', // Fecha o menu ao clicar no item
    // Classes base para estilo e comportamento
    class:
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  },
})
export class BrDropdownMenuItemDirective implements FocusableOption {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly menu = inject(BrDropdownMenuComponent);

  /** Implementação da FocusableOption para o FocusKeyManager */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
