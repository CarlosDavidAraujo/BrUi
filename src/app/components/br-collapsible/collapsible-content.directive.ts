import { Component, computed, inject, input } from '@angular/core';
import { BrCollapsibleDirective } from './collapsible.directive';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'br-collapsible-content',
  standalone: true,
  template: `
    <div class="overflow-hidden">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[id]': 'collapsible.contentId',
    role: 'region',
    '[attr.data-state]': 'collapsible.dataState()',
    '[class]': 'finalClasses()',
  },
})
export class BrCollapsibleContentComponent {
  protected readonly collapsible = inject(BrCollapsibleDirective);

  // 1. Classes base do componente (para a animação grid)
  private readonly class = 'grid text-sm';

  // 2. Captura as classes do usuário
  customClass = input<ClassValue>('', { alias: 'class' });

  // 3. Mescla as classes base com as do usuário
  finalClasses = computed(() => cn(this.class, this.customClass()));
}
