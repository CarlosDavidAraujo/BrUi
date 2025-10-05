import { cn } from '@/lib/utils';
import { computed, Directive, input } from '@angular/core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brCardHeader], br-card-header',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrCardHeaderDirective {
  private readonly class = 'flex flex-col space-y-1.5 p-4';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn(this.class, this.customClass()));
}
