import { Directive, inject } from '@angular/core';
import { BrDialogDirective } from './dialog.directive';

@Directive({
  selector: 'button[brDialogClose]',
  standalone: true,
  host: {
    '(click)': 'dialog.close()',
  },
})
export class BrDialogCloseDirective {
  protected readonly dialog = inject(BrDialogDirective);
}
