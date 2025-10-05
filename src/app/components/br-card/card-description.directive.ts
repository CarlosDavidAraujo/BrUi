import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brCardDescription], br-card-description',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrCardDescriptionDirective {
  private readonly class = 'text-sm';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn(this.class, this.customClass()));
}
