import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { DocsSubheaderComponent } from './docs-subheader.component';

@Component({
  selector: 'app-component-usage',
  standalone: true,
  imports: [MarkdownComponent, DocsSubheaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-subheader title="Uso" />
    <markdown clipboard [src]="'assets/examples/' + code()"> </markdown>
  `,
})
export class ComponentUsage {
  readonly code = input<string>();
}
