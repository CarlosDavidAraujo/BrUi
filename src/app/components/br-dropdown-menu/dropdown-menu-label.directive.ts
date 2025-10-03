import { Directive } from '@angular/core';

@Directive({
  selector: '[brDropdownMenuLabel]',
  standalone: true,
  host: {
    class: 'px-2 py-1.5 text-sm font-semibold text-slate-900',
  },
})
export class BrDropdownMenuLabelDirective {}
