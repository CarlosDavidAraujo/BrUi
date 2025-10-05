import { Directive, computed, model, input } from '@angular/core';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

export type CollapsibleState = 'open' | 'closed';

@Directive({
  selector: '[brCollapsible], br-collapsible',
  standalone: true,
  exportAs: 'brCollapsible',
  host: {
    '[attr.data-state]': 'dataState()',
    '[class]': 'finalClasses()',
  },
})
export class BrCollapsibleDirective {
  readonly open = model(false);

  private static nextId = 0;
  readonly contentId = `br-collapsible-content-${BrCollapsibleDirective.nextId++}`;

  readonly dataState = computed<CollapsibleState>(() =>
    this.open() ? 'open' : 'closed',
  );

  private readonly class = 'block';
  customClass = input<ClassValue>('', { alias: 'class' });
  finalClasses = computed(() => cn(this.class, this.customClass()));

  toggle(): void {
    this.open.update((value) => !value);
  }
}
