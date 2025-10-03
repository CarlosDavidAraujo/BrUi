import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[brSelectContent]',
  standalone: true,
})
export class BrSelectContentDirective {
  // Apenas uma diretiva marcadora. Expõe seu TemplateRef para o pai.
  readonly templateRef = inject(TemplateRef);
}
