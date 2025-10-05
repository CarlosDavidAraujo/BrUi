import { cn } from '@/lib/utils';
import { Directive, ElementRef, inject, input } from '@angular/core';
import { cva } from 'class-variance-authority';

type AddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
        'inline-end':
          'order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          '[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5',
        'block-end':
          '[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

@Directive({
  selector: '[brInputGroupAddon], br-input-group-addon',
  standalone: true,
  host: {
    role: 'group',
    '[attr.data-slot]': '"input-group-addon"',
    '[attr.data-align]': 'align()',
    '[class]': 'finalClasses',
    '(click)': 'onClick($event)',
  },
})
export class BrInputGroupAddonDirective {
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  readonly align = input<AddonAlign>('inline-start');
  readonly class = input('');

  get finalClasses() {
    return cn(
      inputGroupAddonVariants({
        align: this.align(),
      }),
      this.class,
    );
  }

  onClick(event: MouseEvent): void {
    // Do not interfere with clicks on buttons inside the addon
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    // Focus the input/textarea within the same input group
    const input = this.el.parentElement?.querySelector<
      HTMLInputElement | HTMLTextAreaElement
    >('input[brInputGroupInput], textarea[brInputGroupTextarea]');
    input?.focus();
  }
}
