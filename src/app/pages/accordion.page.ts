import { Component } from '@angular/core';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { AccordionMultipleExample } from '../examples/accordion-multi.demo';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { AccordionSingleExample } from '../examples/accordion-single.demo';
import { ComponentUsage } from '../docs/component-usage.component';

@Component({
  imports: [
    ComponentPreviewComponent,
    AccordionSingleExample,
    AccordionMultipleExample,
    DocsHeaderComponent,
    ComponentUsage,
    DocsSubheaderComponent,
  ],
  template: `
    <app-docs-header
      title="Accordion"
      description="Um conjunto de títulos interativos empilhados verticalmente, cada um revelando uma seção de conteúdo."
    />

    <app-component-preview code="accordion-single.demo">
      <example-accordion-single />
    </app-component-preview>

    <app-component-usage code="accordion.usage.html" />

    <app-docs-subheader title="Exemplos" />

    <app-component-preview title="Múltiplo" code="accordion-multi.demo">
      <example-accordion-multiple />
    </app-component-preview>
  `,
})
export class AccordionPageComponent {}
