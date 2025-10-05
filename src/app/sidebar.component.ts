import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="w-56 flex-col border-r  border-slate-200 bg-slate-50">
      <div class="p-4">
        <h2 class="text-xl font-bold">br-ui</h2>
        <p class="text-sm text-slate-600">Documentação</p>
      </div>
      <nav class="flex flex-col p-2">
        <span class="px-2 py-1 text-xs font-semibold uppercase text-slate-500"
          >Começando</span
        >
        @for (link of gettingStartedLinks; track link.path) {
          <a
            [routerLink]="link.path"
            routerLinkActive="bg-slate-200 text-slate-900"
            class="rounded-md px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
          >
            {{ link.label }}
          </a>
        }
        <span
          class="mt-4 px-2 py-1 text-xs font-semibold uppercase text-slate-500"
          >Componentes</span
        >
        @for (link of componentLinks; track link.path) {
          <a
            [routerLink]="link.path"
            routerLinkActive="bg-slate-200 text-slate-900"
            class="rounded-md px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
          >
            {{ link.label }}
          </a>
        }
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  gettingStartedLinks = [{ path: '/introduction', label: 'Introdução' }];

  componentLinks = [
    { path: '/button', label: 'Button' },
    { path: '/card', label: 'Card' },
    { path: '/code', label: 'Code' },
    { path: '/dropdown-menu', label: 'Dropdown Menu' },
    { path: '/input', label: 'Input' },
    { path: '/radio-group', label: 'Radio Group' },
    { path: '/select', label: 'Select' },
    { path: '/separator', label: 'Separator' },
    { path: '/switch', label: 'Switch' },
    { path: '/textarea', label: 'Textarea' },
    { path: '/toast', label: 'Toast' },
    { path: '/tooltip', label: 'Tooltip' },
    { path: '/checkbox', label: 'Checkbox' },
    { path: '/popover', label: 'Popover' },
    { path: '/dialog', label: 'Dialog' },
    { path: '/accordion', label: 'Accordion' },
    { path: '/collapsible', label: 'Collapsible' },
    { path: '/input-group', label: 'Input Group' },
  ].sort((a, b) => a.label.localeCompare(b.label)); // Ordena alfabeticamente
}
