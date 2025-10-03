import { Component, computed, model, signal } from '@angular/core';

import { BrTabsDirective } from './components/br-tabs/tabs.directive';
import { BrTabListDirective } from './components/br-tabs/tabs-list.directive';
import { BrTabTriggerDirective } from './components/br-tabs/tabs-trigger.directive';
import { BrTabContentDirective } from './components/br-tabs/tabs-content.directive';
import { FormsModule } from '@angular/forms';
import { BrTextareaDirective } from './components/br-textarea/textarea.directive';

@Component({
  selector: 'app-root',
  imports: [
    BrTabsDirective,
    BrTabListDirective,
    BrTabTriggerDirective,
    BrTabContentDirective,
    FormsModule,
    BrTextareaDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  comentario = '';

  // Exemplo de texto inicial para o textarea com limite de linhas
  bio = `Primeira linha.
Segunda linha.
Terceira linha.`;
  protected readonly title = signal('br-ui');
}
