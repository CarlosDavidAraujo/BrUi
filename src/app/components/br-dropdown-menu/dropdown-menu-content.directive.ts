import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: 'ng-template[brDropdownMenuContent]', standalone: true })
export class BrDropdownMenuContentDirective {
  readonly templateRef = inject(TemplateRef);
}
