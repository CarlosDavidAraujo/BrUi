import { Component } from '@angular/core';
import { DocsHeaderComponent } from '../docs/docs-header.component';
import { ComponentPreviewComponent } from '../docs/component-preview.component';
import { DocsSubheaderComponent } from '../docs/docs-subheader.component';
import { BrTabsDirective } from '../components/br-tabs/tabs.directive';
import { BrCodeComponent } from '../components/br-code/code.component';
import { BrButtonDirective } from '../components/br-button/button.directive';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [DocsHeaderComponent, ComponentPreviewComponent, BrButtonDirective],
  templateUrl: './button-page.component.html',
})
export class ButtonPageComponent {
  abaInstalacao = 'manual';

  withIconsCode = `
    <div class="flex gap-4">
      <button brButton size="icon">
        <i class="fas fa-city" aria-hidden="true"></i>
      </button>
      <button brButton size="icon" variant="primary">
        <i class="fas fa-city" aria-hidden="true"></i>
      </button>
      <button brButton size="icon" variant="secondary">
        <i class="fas fa-city" aria-hidden="true"></i>
      </button>
    </div>
  `;

  code = {
    install: `// src/app/components/button/button.directive.ts
import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center ...',
  { variants: { /* ... */ } }
);

@Directive({
  selector: 'button[brButton], a[brButton]',
  standalone: true,
  host: { '[class]': 'finalClasses()' },
})
export class BrButtonDirective {
  readonly variant = input<VariantProps<typeof buttonVariants>['variant']>();
  readonly size = input<VariantProps<typeof buttonVariants>['size']>();
  readonly userClass = input<string>('', { alias: 'class' });

  private readonly finalClasses = computed(() =>
    twMerge(buttonVariants({ variant: this.variant(), size: this.size(), className: this.userClass() }))
  );
}`,
    dependencies: `npm install class-variance-authority tailwind-merge`,
    usage: `import { BrButtonDirective } from 'sua/lib/button.directive';

@Component({
  standalone: true,
  imports: [BrButtonDirective],
  template: \`<button brButton variant="secondary">Clique aqui</button>\`
})
export class MeuComponente {}`,
    link: `<a href="/login" brButton variant="outline">Login</a>`,
  };
}
