import { Directive, computed, input } from '@angular/core';
import { type ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

@Directive({
  selector: 'input[brInput]',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrInputDirective {
  readonly customClass = input<ClassValue>('', { alias: 'class' });

  private readonly class = `flex h-10 w-full rounded-sm border font-medium placeholder:font-normal placeholder:italic px-4 text-base 
    hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45`;

  readonly finalClasses = computed(() => cn(this.class, this.customClass()));
}
