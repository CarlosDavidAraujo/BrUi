import { Component } from '@angular/core';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { CheckboxDefaultExample } from '../examples/checkbox-demo';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';
import { CheckboxDisabledExample } from '../examples/checkbox-disabled.demo';
import { ComponentUsage } from '../docs/component-usage.component';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [
    ComponentPreviewComponent,
    CheckboxDefaultExample,
    DocsSubheaderComponent,
    CheckboxDisabledExample,
    ComponentUsage,
  ],
  template: `
    <app-docs-subheader title="Exemplos" />

    <app-component-preview title="Padrão" code="checkbox-demo.ts">
      <example-checkbox-default />
    </app-component-preview>

    <app-component-usage code="checkbox.usage.html" />

    <app-component-preview
      title="Desabilitado"
      code="checkbox-disabled.demo.ts"
    >
      <example-checkbox-disabled />
    </app-component-preview>

    <!--   <app-component-preview
      title="Estado Indeterminado"
      [code]="indeterminateCode"
    >
      <example-checkbox-indeterminate />
    </app-component-preview> -->
  `,
})
export class CheckboxPageComponent {}
