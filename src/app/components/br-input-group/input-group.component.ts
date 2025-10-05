// src/app/components/input-group/input-group.component.ts
import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'br-input-group',
  standalone: true,
  imports: [],
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'class',
  },
})
export class BrInputGroupComponent {
  class = cn(
    'group/input-group border-input dark:bg-input/30 relative flex w-full rounded-sm border outline-none transition-[color,box-shadow]',
    'h-10 has-[>textarea]:h-auto',

    // Variants based on alignment.
    'has-[>[data-align=inline-start]]:[&>input]:pl-2',
    'has-[>[data-align=inline-end]]:[&>input]:pr-2',
    'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
    'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

    // Focus state.
    'has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-2',

    // Error state.
    'has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',
  );
}
