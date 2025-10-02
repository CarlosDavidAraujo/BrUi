import { Directive, ElementRef, inject } from '@angular/core';
import { BrPopoverDirective } from './popover.directive';

@Directive({
  selector: '[brPopoverTrigger]',
  standalone: true,
  host: {
    // --- Comportamento ---
    '(click)': 'popover.toggle()',

    // --- Acessibilidade (ARIA) ---
    // O popover se comporta como um diálogo, então usamos o mesmo 'role'.
    '[attr.aria-haspopup]': "'dialog'",
    '[attr.aria-expanded]': 'popover.open()',
  },
})
export class BrPopoverTriggerDirective {
  // Injeta a diretiva pai para controlar o estado do popover.
  protected readonly popover = inject(BrPopoverDirective);

  // Expõe seu próprio ElementRef para que o pai possa usá-lo como âncora.
  readonly elementRef = inject(ElementRef<HTMLElement>);
}
