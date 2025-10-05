import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brCardTitle], br-card-title',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrCardTitleDirective {
  private readonly class = 'text-xl font-semibold leading-none tracking-tight';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn(this.class, this.customClass()));
}
