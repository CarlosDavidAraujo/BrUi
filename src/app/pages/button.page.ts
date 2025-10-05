import { Component } from '@angular/core';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { ButtonStatesExample } from '../examples/button-state.demo';
import { ButtonSizeExample } from '../examples/button-size.demo';
import { ButtonVariantExample } from '../examples/button-variant.demo';
import { ComponentUsage } from '../docs/component-usage.component';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [
    DocsHeaderComponent,
    ComponentPreviewComponent,
    ButtonStatesExample,
    ButtonSizeExample,
    ButtonVariantExample,
    ComponentUsage,
  ],
  template: `
    <app-docs-header
      title="Button"
      description="Exibe um botão ou um componente que se parece com um botão."
    />

    <app-component-preview code="button-variant.demo">
      <example-button-variant />
    </app-component-preview>

    <app-component-usage code="button.usage.html" />

    <app-component-preview title="Tamanhos" code="button-size.demo">
      <example-button-size />
    </app-component-preview>

    <app-component-preview title="Estados" code="button-state.demo">
      <example-button-states />
    </app-component-preview>
  `,
})
export class ButtonPageComponent {}
