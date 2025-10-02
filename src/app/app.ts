import { Component, computed, model, signal } from '@angular/core';

import { BrTabsDirective } from './components/br-tabs/tabs.directive';
import { BrTabListDirective } from './components/br-tabs/tabs-list.directive';
import { BrTabTriggerDirective } from './components/br-tabs/tabs-trigger.directive';
import { BrTabContentDirective } from './components/br-tabs/tabs-content.directive';

@Component({
  selector: 'app-root',
  imports: [
    BrTabsDirective,
    BrTabListDirective,
    BrTabTriggerDirective,
    BrTabContentDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  abaAtual = signal<string | null>('conta');
  perfilAberto = model(false);

  openItems: { [key: string]: boolean } = {
    q1: true,
    q2: false,
  };

  aceitouTermos = false;

  // --- Lógica para o exemplo de "Selecionar Tudo" ---

  // 3. A lista de itens é a nossa fonte da verdade, como um signal.
  tarefas = signal<Tarefa[]>([
    { nome: 'Revisar design', concluida: true },
    { nome: 'Implementar a API', concluida: false },
    { nome: 'Escrever os testes', concluida: false },
  ]);

  // 4. Usamos 'computed' para derivar os estados do checkbox principal
  //    de forma reativa e automática.

  //    Estará 'checked' se TODAS as tarefas estiverem concluídas.
  todasConcluidas = computed(() => this.tarefas().every((t) => t.concluida));

  //    Estará 'indeterminate' se ALGUMAS (mas não todas) estiverem concluídas.
  algumasConcluidas = computed(() => {
    const tarefasConcluidas = this.tarefas().filter((t) => t.concluida).length;
    return tarefasConcluidas > 0 && tarefasConcluidas < this.tarefas().length;
  });

  // --- Métodos para atualizar os estados ---

  // Chamado quando o checkbox "Selecionar Tudo" é clicado
  marcarTodas(concluida: boolean): void {
    this.tarefas.update((tarefas) => tarefas.map((t) => ({ ...t, concluida })));
  }

  // Chamado quando um checkbox de uma tarefa individual é alterado
  atualizarTarefa(tarefaAlterada: Tarefa, concluida: boolean): void {
    this.tarefas.update((tarefas) =>
      tarefas.map((t) =>
        t.nome === tarefaAlterada.nome ? { ...t, concluida } : t
      )
    );
  }
  protected readonly title = signal('br-ui');
}

interface Tarefa {
  nome: string;
  concluida: boolean;
}
