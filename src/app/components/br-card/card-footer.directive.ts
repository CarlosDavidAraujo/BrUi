import { Directive } from '@angular/core';

@Directive({
  selector: '[brCardFooter]',
  standalone: true,
  host: {

    class: 'flex items-center p-6 pt-0',
  },
})
export class BrCardFooterDirective {}
