import { contentChild, Directive } from '@angular/core';
import { BrDialogTitleDirective } from './dialog-title.directive';
import { BrDialogDescriptionDirective } from './dialog-description.directive';

@Directive({
  selector: '[brDialogPanel]',
  standalone: true,
  host: {
    role: 'dialog',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': 'title()?.id || null',
    '[attr.aria-describedby]': 'description()?.id || null',
    class:
      'fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide',
  },
})
export class BrDialogPanelDirective {
  protected readonly title = contentChild(BrDialogTitleDirective);

  protected readonly description = contentChild(BrDialogDescriptionDirective);
}
