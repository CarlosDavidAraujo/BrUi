import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brCardContent], br-card-content',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrCardContentDirective {
  customClass = input<ClassValue>('', { alias: 'class' });

  finalClasses = computed(() => cn(this.class, this.customClass()));

  private readonly class = 'block p-4 pt-0';
}
