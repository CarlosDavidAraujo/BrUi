import { cn } from '@/lib/utils';
import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[brInputGroupText]',
  standalone: true,
  host: {
    '[class]': 'finalClasses',
  },
})
export class BrInputGroupTextDirective {
  class = input('');

  get finalClasses() {
    return cn(
      "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
      this.class(),
    );
  }
}
