import { Directive } from '@angular/core';

@Directive({
  selector: '[brCardContent]',
  standalone: true,
  host: {
    class: 'p-6 pt-0',
  },
})
export class BrCardContentDirective {}
