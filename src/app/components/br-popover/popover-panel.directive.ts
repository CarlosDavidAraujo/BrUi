import { Directive, inject } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { BrPopoverDirective } from './popover.directive';

@Directive({
  selector: '[brPopoverPanel]',
  standalone: true,
  // 1. Aplicamos a diretiva CdkTrapFocus do CDK ao nosso painel.
  hostDirectives: [
    {
      directive: CdkTrapFocus,
      inputs: ['cdkTrapFocusAutoCapture: true'],
    },
  ],
  host: {
    // --- Acessibilidade (ARIA) ---
    role: 'dialog',
    '(keydown.escape)': 'popover.close() ',
    // --- Estilização ---
    // Deriva o estado diretamente do model do pai.
    '[attr.data-state]': 'popover.open() ? "open" : "closed"',
  },
})
export class BrPopoverPanelDirective {
  // Injeta a diretiva pai para acessar o estado e o método close().
  protected readonly popover = inject(BrPopoverDirective);
}
