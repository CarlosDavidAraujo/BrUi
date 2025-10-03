import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const toastAnimation = trigger('toastAnimation', [
  // O estado 'void' representa quando o elemento não está na view.
  // A transição ':enter' acontece quando o elemento é adicionado (void => *)
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(100%)', // Começa fora da tela à direita
    }),
    animate(
      '250ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({
        opacity: 1,
        transform: 'translateX(0)', // Desliza para a posição final
      })
    ),
  ]),
  // A transição ':leave' acontece quando o elemento é removido (* => void)
  transition(':leave', [
    animate(
      '200ms ease-out',
      style({
        opacity: 0,
        transform: 'scale(0.95)', // Encolhe e some
        height: 0,
        margin: 0,
        padding: 0,
      })
    ),
  ]),
]);
