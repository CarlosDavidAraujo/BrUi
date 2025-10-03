import { Directive, computed, input } from '@angular/core';
// #1: Importar a função 'cva' e o tipo 'VariantProps'
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

// #2: Definir as variantes usando a função 'cva'
const buttonVariants = cva(
  // Classes base, aplicadas a todas as variantes
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-primary hover:bg-primary/10',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-100',
        secondary: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
        link: 'text-slate-900 underline-offset-4 hover:underline',
      },
      size: {
        md: 'h-10 px-6',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Helper type para nossos inputs
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

@Directive({
  selector: 'button[brButton], a[brButton]',
  standalone: true,
  host: {
    '[class]': 'finalClasses()',
  },
})
export class BrButtonDirective {
  // Os inputs agora podem ter seus valores padrão gerenciados pelo CVA
  readonly variant = input<ButtonVariantProps['variant']>('default');
  readonly size = input<ButtonVariantProps['size']>('md');
  readonly customClass = input<string>('', { alias: 'class' });

  // #3: O signal computado agora fica MUITO mais simples
  readonly finalClasses = computed(() =>
    cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
        className: this.customClass(),
      })
    )
  );
}
