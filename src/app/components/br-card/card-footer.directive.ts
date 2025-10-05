import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brCardFooter], br-card-footer',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrCardFooterDirective {
  private readonly class = 'flex items-center p-4 pt-0 gap-2';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn(this.class, this.customClass()));
}
