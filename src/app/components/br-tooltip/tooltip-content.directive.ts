import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const tooltipContentVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'bg-popover text-popover-foreground',
      info: 'bg-info text-info-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type TooltipContentVariantProps = VariantProps<
  typeof tooltipContentVariants
>;

@Directive({
  selector: 'ng-template[brTooltipContent]',
  standalone: true,
})
export class BrTooltipContentDirective {
  readonly variant = input<TooltipContentVariantProps['variant']>('default');
  readonly class = input<string>('', { alias: 'class' });

  readonly finalClasses = computed(() =>
    cn(
      tooltipContentVariants({
        variant: this.variant(),
        className: this.class(),
      }),
    ),
  );
}
