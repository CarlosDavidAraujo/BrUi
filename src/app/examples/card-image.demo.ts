import { Component } from '@angular/core';
import { BrCardContentDirective, BrCardDirective } from '@/components/br-card';

@Component({
  selector: 'example-card-image',
  standalone: true,
  imports: [BrCardDirective, BrCardContentDirective],
  templateUrl: 'card-image.demo.html',
})
export class CardImageExample {}
