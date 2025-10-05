import {
  AfterContentInit,
  computed,
  contentChildren,
  Directive,
  input,
  viewChildren,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkAccordion } from '@angular/cdk/accordion';
import { BrAccordionItemDirective } from './accordion-item.directive';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';
import { BrAccordionTriggerComponent } from './accordion-trigger.component';

@Directive({
  selector: '[brAccordion], br-accordion',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkAccordion,
      inputs: ['multi'],
    },
  ],
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrAccordionDirective implements AfterContentInit {
  customClass = input<ClassValue>('', {
    alias: 'class',
  });

  private readonly class = 'block';

  finalClasses = computed(() => cn(this.class, this.customClass()));

  private readonly items = contentChildren(BrAccordionTriggerComponent, {
    descendants: true,
  });

  private keyManager!: FocusKeyManager<BrAccordionTriggerComponent>;

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items()).withWrap();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      return;
    }
    this.keyManager.onKeydown(event);
  }
}
