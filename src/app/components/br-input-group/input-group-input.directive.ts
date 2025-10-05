import { cn } from '@/lib/utils';
import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: 'input[brInputGroupInput]',
  standalone: true,
  host: {
    '[class]': 'finalClasses',
    '[attr.data-slot]': '"input-group-control"',
  },
})
export class BrInputGroupInputDirective {
  class = input('');

  get finalClasses() {
    return cn(
      'flex-1 rounded-none border-0 px-3 bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-none dark:bg-transparent placeholder:italic placeholder:text-muted-foreground',
      this.class,
    );
  }
}
