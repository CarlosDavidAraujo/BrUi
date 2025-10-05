import { computed, Directive, input } from '@angular/core';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brDialogHeader], br-dialog-header',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrDialogHeaderDirective {
  readonly customClass = input<ClassValue>('', { alias: 'class' });
  readonly finalClasses = computed(() =>
    cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      this.customClass(),
    ),
  );
}
