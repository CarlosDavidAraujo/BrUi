import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brCard], br-card',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrCardDirective {
  private readonly class =
    'block border bg-card text-card-foreground shadow-sm';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn(this.class, this.customClass()));
}
