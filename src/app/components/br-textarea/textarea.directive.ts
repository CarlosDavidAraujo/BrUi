import { Directive, input, numberAttribute } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Directive({
  selector: 'textarea[brTextarea]', // Seletor específico para elementos <textarea>
  standalone: true,
  // 1. O coração da nossa diretiva: aplicamos a lógica do CDK aqui.
  hostDirectives: [
    {
      directive: CdkTextareaAutosize,
      // 2. Mapeamos os inputs do CDK para os nossos próprios inputs.
      //    Formato: 'inputDoCDK: nossoInput'
      inputs: ['cdkAutosizeMinRows: minRows', 'cdkAutosizeMaxRows: maxRows'],
    },
  ],
})
export class BrTextareaDirective {
  // 3. Definimos nossos inputs para que o mapeamento acima funcione.

  /** O número mínimo de linhas que o textarea deve ter. */
  readonly minRows = input<number, string | number | undefined>(undefined, {
    transform: numberAttribute,
  });

  /** O número máximo de linhas que o textarea pode atingir. */
  readonly maxRows = input<number, string | number | undefined>(undefined, {
    transform: numberAttribute,
  });
}
