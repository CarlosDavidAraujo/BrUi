import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brDialogTitle], br-dialog-title',
  standalone: true,
  host: {
    '[id]': 'id',
    '[class]': 'finalClasses()',
  },
})
export class BrDialogTitleDirective {
  private static nextId = 0;
  readonly id = `br-dialog-title-${BrDialogTitleDirective.nextId++}`;

  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn('font-bold text-lg', this.customClass()));
}
