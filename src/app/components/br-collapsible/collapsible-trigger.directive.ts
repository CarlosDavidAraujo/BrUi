import { Component, computed, inject, input } from '@angular/core';
import { BrCollapsibleDirective } from './collapsible.directive';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'br-collapsible-trigger',
  standalone: true,
  template: `
    <button
      type="button"
      [class]="finalClasses()"
      (click)="collapsible.toggle()"
      [attr.aria-expanded]="collapsible.open()"
      [attr.aria-controls]="collapsible.contentId"
      [attr.data-state]="collapsible.dataState()"
    >
      <ng-content></ng-content>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 shrink-0 transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  `,
})
export class BrCollapsibleTriggerComponent {
  protected readonly collapsible = inject(BrCollapsibleDirective);

  private readonly class =
    'flex w-full items-center justify-between rounded-md bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 [&[data-state=open]>svg]:rotate-180';

  customClass = input<ClassValue>('', { alias: 'class' });

  finalClasses = computed(() => cn(this.class, this.customClass()));
}
