import { Component } from '@angular/core';
import {
  BrAccordionDirective,
  BrAccordionItemDirective,
  BrAccordionTriggerComponent,
  BrAccordionContentDirective,
} from '@/components/br-accordion';

@Component({
  selector: 'example-accordion-multiple',
  standalone: true,
  imports: [
    BrAccordionContentDirective,
    BrAccordionItemDirective,
    BrAccordionDirective,
    BrAccordionTriggerComponent,
  ],
  templateUrl: 'accordion-multi.demo.html',
})
export class AccordionMultipleExample {}
