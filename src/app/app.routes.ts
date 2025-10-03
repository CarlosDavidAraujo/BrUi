import { Routes } from '@angular/router';
import { ButtonPageComponent } from './pages/button-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'introduction', pathMatch: 'full' }, // Redireciona a home para a introdução
  { path: 'button', component: ButtonPageComponent },
  // Adicione aqui as rotas para os outros componentes...
  // { path: 'card', component: CardPageComponent },
  // { path: 'select', component: SelectPageComponent },
];
