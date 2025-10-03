import { Directive } from '@angular/core';

@Directive({
  selector: '[brDropdownMenuSeparator]',
  standalone: true,
  host: {
    role: 'separator',
    class: '-mx-1 my-1 h-px bg-slate-200',
  },
})
export class BrDropdownMenuSeparatorDirective {}
