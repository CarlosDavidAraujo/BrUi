import { Directive, inject } from '@angular/core';
import { BrDialogDirective } from './dialog.directive';

@Directive({
  selector: '[brDialogTrigger]',
  standalone: true,
  host: {
    '(click)': 'dialog.open()',

    '[attr.aria-haspopup]': "'dialog'",
    '[attr.aria-expanded]': 'dialog.state',
  },
})
export class BrDialogTriggerDirective {
  protected readonly dialog = inject(BrDialogDirective, { host: true });
}
