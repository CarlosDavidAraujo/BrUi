import { Component } from '@angular/core';
import {
  BrAccordionDirective,
  BrAccordionItemDirective,
  BrAccordionTriggerComponent,
  BrAccordionContentDirective,
} from '@/components/br-accordion';

@Component({
  selector: 'example-accordion-single',
  standalone: true,
  imports: [
    BrAccordionDirective,
    BrAccordionItemDirective,
    BrAccordionContentDirective,
    BrAccordionTriggerComponent,
  ],
  templateUrl: 'accordion-single.demo.html',
})
export class AccordionSingleExample {}
