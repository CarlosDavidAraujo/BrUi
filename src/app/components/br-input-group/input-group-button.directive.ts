import { cn } from '@/lib/utils';
import { Directive, input } from '@angular/core';
import { cva } from 'class-variance-authority';

type ButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

const inputGroupButtonVariants = cva(
  'flex items-center justify-center gap-2 text-sm shadow-none curso-pointer',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: 'h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

@Directive({
  selector: 'button[brInputGroupButton]',
  standalone: true,
  host: {
    '[attr.data-size]': 'size()',
    '[class]': 'finalClasses',
  },
})
export class BrInputGroupButtonDirective {
  readonly size = input<ButtonSize>('xs');
  readonly class = input('');

  get finalClasses() {
    return cn(
      inputGroupButtonVariants({
        size: this.size(),
      }),
      this.class,
    );
  }
}
