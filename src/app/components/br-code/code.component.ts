import {
  Component,
  input,
  OnChanges,
  SimpleChanges,
  inject,
  SecurityContext,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';

// #1: Importar o Prism.js, o idioma e os plugins desejados
// Estes imports não trazem valores, eles apenas executam o código do Prism
// para que ele se anexe ao objeto 'window.Prism'.
/* import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
 */

@Component({
  selector: 'br-code',
  standalone: true,
  template: `
    <pre
      [class]="'language-' + language()"
      class="rounded-md"
    ><code [innerHTML]="highlightedCode"></code></pre>
  `,
})
export class BrCodeComponent implements OnChanges, AfterViewInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** O código a ser exibido. */
  readonly code = input.required<string>();

  /** O identificador do idioma para o Prism (ex: 'typescript'). */
  readonly language = input.required<string>();

  /** Propriedade para armazenar o HTML seguro e colorido. */
  protected highlightedCode: SafeHtml = '';

  ngOnChanges(changes: SimpleChanges): void {
    // Se o input 'code' ou 'language' mudar, re-processa o código.
    if (changes['code'] || changes['language']) {
      this.highlight();
    }
  }

  ngAfterViewInit(): void {
    // #4: Ativa os plugins do Prism no nosso elemento após ele ser renderizado.
    Prism.highlightAllUnder(this.elementRef.nativeElement);
  }

  /**
   * #3: A função principal que usa o Prism para colorir o código.
   */
  private highlight(): void {
    const code = this.code();
    const language = this.language();

    // Verifica se o idioma carregado existe no Prism.
    if (Prism.languages[language]) {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language],
        language
      );
      // Usamos o DomSanitizer para marcar o HTML como seguro.
      this.highlightedCode =
        this.sanitizer.bypassSecurityTrustHtml(highlighted);
    } else {
      console.log('caiui aqui');
      // Se o idioma não for encontrado, exibe o código sem colorir, escapando o HTML.
      const escaped = this.sanitizer.sanitize(SecurityContext.HTML, code);
      this.highlightedCode = escaped ?? '';
    }
  }
}
