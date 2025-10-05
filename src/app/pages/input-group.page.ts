// src/app/pages/input-group-demo.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BrInputGroupAddonDirective,
  BrInputGroupButtonDirective,
  BrInputGroupComponent,
  BrInputGroupInputDirective,
  BrInputGroupTextareaDirective,
  BrInputGroupTextDirective,
} from '../components/br-input-group';

@Component({
  selector: 'app-input-group-demo',
  standalone: true,
  imports: [
    BrInputGroupComponent,
    BrInputGroupInputDirective,
    BrInputGroupTextareaDirective,
    BrInputGroupAddonDirective,
    BrInputGroupTextDirective,
    BrInputGroupButtonDirective,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-6 p-4">
      <h2 class="text-lg font-semibold">Input Group Examples</h2>

      <!-- Example 1: Search with addons -->
      <br-input-group>
        <input brInputGroupInput placeholder="Search..." />
        <div brInputGroupAddon>
          <!-- Placeholder for Search icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <div brInputGroupAddon align="inline-end">12 results</div>
      </br-input-group>

      <!-- Example 2: URL input with button and tooltip -->
      <br-input-group>
        <div brInputGroupAddon>
          <span brInputGroupText>https://</span>
        </div>
        <input brInputGroupInput placeholder="example.com" class="!pl-1" />
        <div brInputGroupAddon align="inline-end">
          <!-- Using native title for tooltip -->
          <button
            brInputGroupButton
            class="rounded-full"
            size="icon-xs"
            title="This is content in a tooltip."
          >
            <!-- Placeholder for Info icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-info"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </div>
      </br-input-group>

      <!-- Example 3: Textarea with block-end addon -->
      <br-input-group>
        <textarea
          brInputGroupTextarea
          placeholder="Ask, Search or Chat..."
        ></textarea>
        <div brInputGroupAddon align="block-end">
          <button
            brInputGroupButton
            variant="outline"
            class="rounded-full"
            size="icon-xs"
          >
            <!-- Placeholder for Plus icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
          <!-- Placeholder for DropdownMenu -->
          <button brInputGroupButton variant="ghost">Auto</button>
          <span brInputGroupText class="ml-auto">52% used</span>
          <!-- Placeholder for Separator -->
          <div class="!h-4 w-px bg-border"></div>
          <button
            brInputGroupButton
            variant="default"
            class="rounded-full"
            size="icon-xs"
            disabled
          >
            <!-- Placeholder for ArrowUp icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </br-input-group>

      <!-- Example 4: Simple input with status icon -->
      <br-input-group>
        <input brInputGroupInput placeholder="@brui" />
        <div brInputGroupAddon align="inline-end">
          <div
            class="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full"
          >
            <!-- Placeholder for Check icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
        </div>
      </br-input-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPage {}
