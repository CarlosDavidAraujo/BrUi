import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center px-6 justify-center whitespace-nowrap rounded-full text-base font-semibold transition-colors focus-visible:br-outline hover:cursor-pointer disabled:pointer-events-none disabled:opacity-45',
  {
    variants: {
      variant: {
        default: 'text-primary hover:bg-primary/15',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-100',
        secondary: 'border border-primary text-primary hover:bg-primary/15',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
        link: 'text-slate-900 underline-offset-4 hover:underline',
      },
      size: {
        md: 'h-10',
        sm: 'h-8',
        lg: 'h-12',
        icon: 'h-10 aspect-square p-0',
        'icon-sm': 'h-8 aspect-square p-0',
        'icon-lg': 'h-12 aspect-square p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

@Directive({
  selector: 'button[brButton], a[brButton]',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrButtonDirective {
  readonly variant = input<ButtonVariantProps['variant']>('default');
  readonly size = input<ButtonVariantProps['size']>('md');
  readonly customClass = input<string>('', { alias: 'class' });

  readonly finalClasses = computed(() =>
    cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
        className: this.customClass(),
      }),
    ),
  );
}
