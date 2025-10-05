import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { BrAccordionItemDirective } from './accordion-item.directive';
import { BrAccordionDirective } from './accordion.directive';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'br-accordion-trigger',
  standalone: true,
  template: ` <h3 class="flex">
    <button
      #triggerButton
      type="button"
      [id]="item.triggerId"
      [class]="finalClasses()"
      [attr.data-state]="item.state"
      [attr.aria-expanded]="item.state === 'open'"
      [attr.aria-controls]="item.contentId"
      (click)="item.toggle()"
      (keydown)="accordion?.handleKeyDown($event)"
    >
      <i
        class="fas fa-angle-down h-4 w-4 shrink-0 transition-transform duration-200"
        aria-hidden="true"
      ></i>
      <ng-content />
    </button>
  </h3>`,
})
export class BrAccordionTriggerComponent implements FocusableOption {
  protected readonly item = inject(BrAccordionItemDirective);
  protected readonly accordion = inject(BrAccordionDirective, {
    optional: true,
  });

  private readonly triggerButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('triggerButton');

  customClass = input<ClassValue>('', { alias: 'class' });

  private readonly class =
    'flex flex-1 items-center focus-visible:br-outline text-primary hover:bg-primary/15 transition-colors data-[state=open]:font-semibold cursor-pointer gap-x-6 p-4 [&[data-state=open]>i]:rotate-180';

  finalClasses = computed(() => cn(this.class, this.customClass()));

  focus() {
    this.triggerButton().nativeElement.focus();
  }
}
