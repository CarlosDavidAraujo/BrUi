import { Component } from '@angular/core';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { DialogDemoExample } from '../examples/dialog.demo';
import { ComponentUsage } from '../docs/component-usage.component';
import { DialogSizeExample } from '../examples/dialog-size.demo';

@Component({
  selector: 'app-dialog-page',
  imports: [
    ComponentPreviewComponent,
    DocsHeaderComponent,
    DialogDemoExample,
    ComponentUsage,
    DialogSizeExample,
  ],
  template: `
    <app-docs-header
      title="Dialog"
      description="Uma janela sobreposta à janela principal ou a outra janela de diálogo, tornando o conteúdo abaixo dela inerte."
    />

    <app-component-preview code="dialog.demo">
      <example-dialog-demo />
    </app-component-preview>

    <app-component-usage code="dialog.usage.html" />

    <app-component-preview
      title="Largo"
      code="dialog-size.demo"
      [lineTs]="'4, 6-11'"
    >
      <example-dialog-size />
    </app-component-preview>
  `,
})
export class DialogPageComponent {}
