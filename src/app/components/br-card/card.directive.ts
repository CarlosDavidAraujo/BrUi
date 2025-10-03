import { Directive } from '@angular/core';

@Directive({
  selector: '[brCard]',
  standalone: true,
  host: {
    class: 'rounded-lg border bg-card text-card-foreground shadow-sm',
  },
})
export class BrCardDirective {}
