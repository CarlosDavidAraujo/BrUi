import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BrTabsDirective } from '../components/br-tabs/tabs.directive';
import { BrTabListDirective } from '../components/br-tabs/tabs-list.directive';
import { BrTabTriggerDirective } from '../components/br-tabs/tabs-trigger.directive';
import { BrTabContentDirective } from '../components/br-tabs/tabs-content.directive';

import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [
    BrTabsDirective,
    BrTabListDirective,
    BrTabTriggerDirective,
    BrTabContentDirective,
    MarkdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="my-6">
      @if (title()) {
        <h3 class="mb-2 text-md font-semibold">{{ title() }}</h3>
      }
      <div brTabs activeTab="preview">
        <div brTabList class="grid grid-cols-3 w-max">
          <button brTabTrigger="preview">Preview</button>
          <button brTabTrigger="html">HTML</button>
          <button brTabTrigger="ts">TS</button>
        </div>
        <div brTabContent="preview">
          <div
            class="p-10 flex items-center justify-center h-[450px] overflow-y-auto border"
          >
            <ng-content></ng-content>
          </div>
        </div>

        <div brTabContent="html">
          <div
            class="max-h-[450px] h-[450px] overflow-y-auto border bg-[#FAFAFA]"
          >
            <markdown
              clipboard
              lineNumbers
              lineHighlight
              [line]="lineHtml()"
              [src]="'assets/examples/' + code() + '.html'"
            >
            </markdown>
          </div>
        </div>

        <div brTabContent="ts">
          <div
            class="max-h-[450px] h-[450px] overflow-y-auto border bg-[#FAFAFA]"
          >
            <markdown
              clipboard
              lineNumbers
              lineHighlight
              [line]="lineTs()"
              [src]="'assets/examples/' + code() + '.ts'"
            >
            </markdown>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ComponentPreviewComponent {
  readonly title = input<string>();
  readonly code = input<string>();
  readonly lineHtml = input<string>();
  readonly lineTs = input<string>();
}
