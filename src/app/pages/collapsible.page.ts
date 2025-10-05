import { Component } from '@angular/core';

import { DocsHeaderComponent } from '../docs/docs-header.component';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import {
  CollapsibleDefaultExample,
  CollapsibleOpenExample,
} from '../examples/collapsible-demo';

@Component({
  selector: 'app-collapsible-page',
  standalone: true,
  imports: [
    DocsHeaderComponent,
    ComponentPreviewComponent,
    CollapsibleDefaultExample,
    DocsSubheaderComponent,
    CollapsibleOpenExample,
  ],
  template: `
    <app-docs-header
      title="Collapsible"
      description="Um painel de conteúdo expansível."
    />

    <app-component-preview
      title="Demonstração"
      [code]="code.usage"
      language="html"
    >
      <example-collapsible-default />
    </app-component-preview>

    <app-docs-subheader title="Instalação" />

    <app-docs-subheader title="Uso" />

    <app-docs-subheader title="Exemplos" />
    <app-component-preview
      title="Iniciando Aberto"
      [code]="code.open"
      language="html"
    >
      <example-collapsible-open />
    </app-component-preview>
  `,
})
export class CollapsiblePageComponent {
  code = {
    install: `ng generate component components/br-collapsible/collapsible
ng generate component components/br-collapsible/collapsible-trigger
ng generate component components/br-collapsible/collapsible-content
# Copie e cole os códigos de cada arquivo.`,
    usage: `
<div brCollapsible>
  <br-collapsible-trigger>
    <span>Título</span>
  </br-collapsible-trigger>

  <br-collapsible-content>
    Conteúdo que será expandido/recolhido.
  </br-collapsible-content>
</div>
    `.trim(),
    open: `
<div brCollapsible [open]="true">
  <br-collapsible-trigger>
    <span>Título</span>
  </br-collapsible-trigger>
  ...
</div>
    `.trim(),
  };
}
