import { Component } from '@angular/core';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { CardExample } from '../examples/card.demo';
import { CardImageExample } from '../examples/card-image.demo';
import { CardScrollExample } from '../examples/card-scroll.demo';
import { ComponentUsage } from '../docs/component-usage.component';

@Component({
  standalone: true,
  imports: [
    ComponentPreviewComponent,
    DocsSubheaderComponent,
    DocsHeaderComponent,
    CardExample,
    CardImageExample,
    CardScrollExample,
    ComponentUsage,
  ],
  template: `
    <app-docs-header
      title="Card"
      description="Exibe um cartão com cabeçalho, conteúdo e rodapé."
    />
    <app-component-preview code="card.demo">
      <example-card />
    </app-component-preview>

    <app-component-usage code="card.usage.html" />

    <app-docs-subheader title="Exemplos" />

    <app-component-preview title="Com Scroll" code="card-scroll.demo">
      <example-card-scroll />
    </app-component-preview>

    <app-component-preview title="Somente Imagem" code="card-image.demo">
      <example-card-image />
    </app-component-preview>
  `,
})
export class CardPageComponent {}
