import { Component } from '@angular/core';
import {
  InputDefaultExample,
  InputDisabledExample,
  InputFileExample,
  InputWithButtonExample,
  InputWithIconExample,
} from '../examples/input-demo.component';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [
    InputDefaultExample,
    InputDisabledExample,
    InputFileExample,
    InputWithButtonExample,
    InputWithIconExample,
    ComponentPreviewComponent,
    DocsSubheaderComponent,
  ],
  templateUrl: './input.page.html',
})
export class InputPageComponent {
  // ... lógica dos snippets de código
}
