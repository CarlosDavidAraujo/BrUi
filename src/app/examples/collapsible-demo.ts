import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrCollapsibleDirective } from '../components/br-collapsible/collapsible.directive';
import { BrCollapsibleTriggerComponent } from '../components/br-collapsible/collapsible-trigger.directive';
import { BrCollapsibleContentComponent } from '../components/br-collapsible/collapsible-content.directive';

@Component({
  selector: 'example-collapsible-default',
  standalone: true,
  imports: [
    CommonModule,
    BrCollapsibleDirective,
    BrCollapsibleTriggerComponent,
    BrCollapsibleContentComponent,
  ],
  template: `
    <div brCollapsible class="w-full max-w-sm space-y-2">
      <br-collapsible-trigger>
        <span>Ver Termos de Serviço</span>
      </br-collapsible-trigger>

      <br-collapsible-content>
        <div class="rounded-md border border-slate-200 px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>
        <div class="mt-2 rounded-md border border-slate-200 px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
      </br-collapsible-content>
    </div>
  `,
})
export class CollapsibleDefaultExample {}

@Component({
  selector: 'example-collapsible-open',
  standalone: true,
  imports: [
    CommonModule,
    BrCollapsibleDirective,
    BrCollapsibleTriggerComponent,
    BrCollapsibleContentComponent,
  ],
  template: `
    <div brCollapsible [open]="true" class="w-full max-w-sm space-y-2">
      <br-collapsible-trigger>
        <span>Ver Termos de Serviço</span>
      </br-collapsible-trigger>

      <br-collapsible-content>
        <div class="rounded-md border border-slate-200 px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>
        <div class="mt-2 rounded-md border border-slate-200 px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
      </br-collapsible-content>
    </div>
  `,
})
export class CollapsibleOpenExample {}
