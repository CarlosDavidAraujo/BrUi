import { cn } from '@/lib/utils';
import { Directive, input } from '@angular/core';

@Directive({
  selector: 'textarea[brInputGroupTextarea]',
  standalone: true,
  host: {
    '[class]': 'finalClasses',
    '[attr.data-slot]': '"input-group-control"',
  },
})
export class BrInputGroupTextareaDirective {
  class = input('');

  get finalClasses() {
    return cn(
      'flex-1 resize-none rounded-none border-0 bg-transparent p-3 shadow-none focus-visible:ring-0 focus-visible:outline-none dark:bg-transparent placeholder:italic placeholder:text-muted-foreground',
      this.class,
    );
  }
}
