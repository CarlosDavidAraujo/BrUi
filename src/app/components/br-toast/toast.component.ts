import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { ToastData } from './toast.model';
import { toastAnimation } from './toast.animations';

@Component({
  selector: 'br-toast',
  standalone: true,
  imports: [], // Nenhuma importação de CommonModule é necessária para @switch
  template: `
    @switch (data().type) { @case ('success') {
    <svg
      class="h-6 w-6 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    } @case ('error') {
    <svg
      class="h-6 w-6 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    } @case ('warning') {
    <svg
      class="h-6 w-6 text-amber-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
    } @case ('info') {
    <svg
      class="h-6 w-6 text-blue-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    } }

    <div class="flex-1">
      @if (data.title) {
      <p class="font-semibold text-slate-800">{{ data.title }}</p>
      }
      <p class="text-sm text-slate-600">{{ data.message }}</p>
    </div>

    <button
      (click)="onCloseClick()"
      class="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <span class="sr-only">Fechar</span>
    </button>
  `,
  animations: [toastAnimation],
  host: {
    '[@toastAnimation]': '',
    role: 'status',
    'aria-live': 'polite',
    class:
      'flex w-full max-w-sm items-start gap-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrToastComponent {
  data = input.required<ToastData>();
  closeRequest = output<string>();

  protected onCloseClick(): void {
    this.closeRequest.emit(this.data().id);
  }
}
