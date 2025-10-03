import { Component, input } from '@angular/core';

@Component({
  selector: 'app-docs-header',
  standalone: true,
  template: `
    <div class="space-y-2 border-b border-slate-200 pb-4">
      <h1 class="text-4xl font-bold tracking-tight">{{ title() }}</h1>
      <p class="text-lg text-slate-600">{{ description() }}</p>
    </div>
  `,
})
export class DocsHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
