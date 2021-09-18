import { trigger, transition, style, animate } from '@angular/animations';

export const cardAnimation = trigger('cardAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-200px)' }),
      animate('.3s', style({ opacity: 1, transform: 'none' }))
    ])
]);
