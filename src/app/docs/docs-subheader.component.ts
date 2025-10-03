import { Component, input } from '@angular/core';

@Component({
  selector: 'app-docs-subheader',
  standalone: true,
  template: `<h2 class="mt-12 text-2xl font-bold tracking-tight">
    {{ title() }}
  </h2>`,
})
export class DocsSubheaderComponent {
  readonly title = input.required<string>();
}
