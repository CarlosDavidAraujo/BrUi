import {
  computed,
  contentChild,
  Component,
  inject,
  input,
} from '@angular/core';
import { BrDialogTitleDirective } from './dialog-title.directive';
import { BrDialogDescriptionDirective } from './dialog-description.directive';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { BrDialogDirective } from './dialog.directive';
import { BrButtonDirective } from '../br-button/button.directive';

@Component({
  selector: 'br-dialog-content',
  standalone: true,
  imports: [BrButtonDirective],
  template: `
    <ng-content />
    <button
      brButton
      type="button"
      size="icon"
      data-dismiss="br-modal"
      aria-label="Fechar"
      (click)="dialog.close()"
      class="absolute top-4 right-4 disabled:pointer-events-none"
    >
      <i class="fas fa-times" aria-hidden="true"></i>
      <span class="sr-only">Close</span>
    </button>
  `,
  host: {
    role: 'dialog',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': 'title()?.id || null',
    '[attr.aria-describedby]': 'description()?.id || null',
    '[attr.data-state]': 'dialog.state',
    '[class]': 'finalClasses()',
  },
})
export class BrDialogContentComponent {
  readonly dialog = inject(BrDialogDirective);
  protected readonly title = contentChild(BrDialogTitleDirective);
  protected readonly description = contentChild(BrDialogDescriptionDirective);

  readonly customClass = input<ClassValue>('', { alias: 'class' });
  protected readonly finalClasses = computed(() =>
    cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-4 shadow-lg',
      this.customClass(),
    ),
  );
}
