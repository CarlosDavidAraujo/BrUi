import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brDialogDescription], br-dialog-description',
  standalone: true,
  host: {
    '[id]': 'id',
    '[class]': 'finalClasses()',
  },
})
export class BrDialogDescriptionDirective {
  private static nextId = 0;

  readonly id = `br-dialog-description-${BrDialogDescriptionDirective.nextId++}`;

  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn('text-sm', this.customClass()));
}
