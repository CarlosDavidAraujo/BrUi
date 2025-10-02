import { Directive } from '@angular/core';

@Directive({
  // Seletor específico para garantir que seja usada em um <ng-template>
  selector: 'ng-template[brPopoverContent]',
  standalone: true,
})
export class BrPopoverContentDirective {
  // Diretiva marcadora, sem lógica interna.
}
