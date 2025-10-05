import { Component } from '@angular/core';
import {
  BrCardContentDirective,
  BrCardDescriptionDirective,
  BrCardDirective,
  BrCardFooterDirective,
  BrCardHeaderDirective,
  BrCardTitleDirective,
} from '@/components/br-card';
import { BrButtonDirective } from '@/components/br-button/button.directive';

@Component({
  selector: 'example-card-scroll',
  standalone: true,
  imports: [
    BrCardDirective,
    BrCardHeaderDirective,
    BrCardContentDirective,
    BrCardFooterDirective,
    BrButtonDirective,
    BrCardTitleDirective,
    BrCardDescriptionDirective,
  ],
  templateUrl: 'card-scroll.demo.html',
})
export class CardScrollExample {}
