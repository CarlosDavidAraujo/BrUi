import { Component, OnInit } from '@angular/core';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import TooltipPositionExample from '../examples/tooltip-position-demo';
import TooltipVariantExample from '../examples/tooltip-variant-demo';

@Component({
  selector: 'tooltip-page',
  standalone: true,
  imports: [
    DocsHeaderComponent,
    DocsSubheaderComponent,
    ComponentPreviewComponent,
    TooltipPositionExample,
    TooltipVariantExample,
  ],
  template: `
    <app-docs-header
      title="Tooltip"
      description="Um pop-up que exibe informações relacionadas a um elemento quando o elemento recebe o foco do teclado ou o mouse passa sobre ele."
    ></app-docs-header>

    <app-docs-subheader title="Position"> </app-docs-subheader>
    <app-component-preview code="tooltip-position-demo.ts">
      <example-tooltip-position />
    </app-component-preview>

    <app-docs-subheader title="Variants"> </app-docs-subheader>
    <app-component-preview code="tooltip-variant-demo.html">
      <example-tooltip-variant />
    </app-component-preview>
  `,
})
export class TooltipPage {}
