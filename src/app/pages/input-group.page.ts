import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { InputGroupExample } from '../examples/input-group.demo';
import { ComponentUsage } from '../docs/component-usage.component';

@Component({
  selector: 'app-input-group-page',
  standalone: true,
  imports: [
    DocsHeaderComponent,
    ComponentPreviewComponent,
    InputGroupExample,
    ComponentUsage,
  ],
  template: `
    <app-docs-header
      title="Input Group"
      description="Exibe informações ou ações adicionais em uma entrada ou área de texto."
    />

    <app-component-preview code="input-group.demo">
      <example-input-group />
    </app-component-preview>

    <app-component-usage code="input-group.usage.html" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPage {}
