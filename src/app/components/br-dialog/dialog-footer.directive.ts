import { computed, Directive, input } from '@angular/core';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brDialogFooter], br-dialog-footer',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrDialogFooterDirective {
  readonly customClass = input<ClassValue>('', { alias: 'class' });
  readonly finalClasses = computed(() =>
    cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end gap-2',
      this.customClass(),
    ),
  );
}
