import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy } from '@ng-icons/lucide';
import { NGTW_CLIPBOARD } from '@ngtw-kit/common/tokens';
import hljs from 'highlight.js';

@Component({
  host: {
    class:
      'flex flex-col rounded bg-zinc-800 p-2 gap-1 font-mono text-xs select-none',
  },
  imports: [NgIcon, NgClass],
  providers: [
    provideIcons({
      lucideCopy,
    }),
  ],
  selector: 'sample-code',
  template: `
    <header class="flex flex-row items-center justify-between text-zinc-500">
      <small
        class="text-2xs px-1 font-sans leading-none tracking-widest"
      >
        {{ filename() }}
      </small>
      <button
        class="inline-flex items-center rounded-lg p-1.5 transition-colors outline-none hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-purple-500"
        type="button"
      >
        @if (copied()) {
          <span class="font-sans text-xs"> Copied! </span>
        } @else {
          <ng-icon (click)="copy()" name="lucideCopy" size="16" />
        }
      </button>
    </header>
    <pre
      class="scrollbar-track-zinc-900 max-h-96 overflow-auto rounded bg-zinc-900 px-8 py-4 leading-loose"
    >
      <code class="text-sm" [ngClass]="languageClass()" [innerHTML]="highlightedCode()">
        <ng-content/>
      </code>
    </pre>
  `,
})
export class Code {
  language = input('typescript');
  protected languageClass = () => {
    return `language-${this.language()}`;
  };

  code = input('');
  filename = input('example.ts');
  protected highlightedCode = () => {
    return hljs.highlight(this.code(), { language: this.language() }).value;
  };

  clipboard = inject(NGTW_CLIPBOARD);
  copied = signal(false);

  constructor() {
    hljs.highlightAll();
  }

  protected copy() {
    this.clipboard.writeText(this.code());
    this.copied.set(true);
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      this.copied.set(false);
    }, 300);
  }
}
