import { Directive } from '@angular/core';

@Directive({
  selector: '[brCardDescription]',
  standalone: true,
  host: {
    class: 'text-sm text-muted-foreground',
  },
})
export class BrCardDescriptionDirective {}
