import { Routes } from '@angular/router';
import { ButtonPageComponent } from './pages/button.page';
import { InputPageComponent } from './pages/input.page';
import { CheckboxPageComponent } from './pages/checkbox.page';
import { AccordionPageComponent } from './pages/accordion.page';
import { CardPageComponent } from './pages/card.page';
import { CollapsiblePageComponent } from './pages/collapsible.page';
import { DialogPageComponent } from './pages/dialog.page';
import { TooltipPage } from './pages/tooltip.page';
import { InputGroupPage } from './pages/input-group.page';

export const routes: Routes = [
  { path: '', redirectTo: 'introduction', pathMatch: 'full' }, // Redireciona a home para a introdução
  { path: 'accordion', component: AccordionPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'input', component: InputPageComponent },
  { path: 'card', component: CardPageComponent },
  { path: 'checkbox', component: CheckboxPageComponent },
  { path: 'collapsible', component: CollapsiblePageComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'tooltip', component: TooltipPage },
  { path: 'input-group', component: InputGroupPage },
  // Adicione aqui as rotas para os outros componentes...
  // { path: 'card', component: CardPageComponent },
  // { path: 'select', component: SelectPageComponent },
];
