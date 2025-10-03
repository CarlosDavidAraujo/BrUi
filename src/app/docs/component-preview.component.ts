import { Component, input } from '@angular/core';
import { BrTabsDirective } from '../components/br-tabs/tabs.directive';
import { BrTabListDirective } from '../components/br-tabs/tabs-list.directive';
import { BrTabTriggerDirective } from '../components/br-tabs/tabs-trigger.directive';
import { BrTabContentDirective } from '../components/br-tabs/tabs-content.directive';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  template: `
    <div class="my-6">
      @if (title()) {
      <h3 class="mb-2 text-md font-semibold">{{ title() }}</h3>
      }

      <div brTabs activeTab="preview">
        <div brTabList>
          <button brTabTrigger="preview">Preview</button>
          <button brTabTrigger="code">Code</button>
        </div>
        <div brTabContent="preview">
          <div
            class="flex items-center justify-center h-[400px] max-h-[400px] overflow-y-auto border"
          >
            <ng-content></ng-content>
          </div>
        </div>
        <div brTabContent="code">
          <pre><code>{{this.code()}}</code></pre>
        </div>
      </div>
    </div>
  `,
  imports: [
    BrTabsDirective,
    BrTabListDirective,
    BrTabTriggerDirective,
    BrTabContentDirective,
  ],
})
export class ComponentPreviewComponent {
  readonly title = input<string>();
  readonly code = input<string>();
}
