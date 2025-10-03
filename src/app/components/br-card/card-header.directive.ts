import { Directive } from '@angular/core';

@Directive({
  selector: '[brCardHeader]',
  standalone: true,
  host: {
    class: 'flex flex-col space-y-1.5 p-6',
  },
})
export class BrCardHeaderDirective {}
