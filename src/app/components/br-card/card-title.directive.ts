import { Directive } from '@angular/core';

@Directive({
  selector: '[brCardTitle]',
  standalone: true,
  host: {
    class: 'text-2xl font-semibold leading-none tracking-tight',
  },
})
export class BrCardTitleDirective {}
