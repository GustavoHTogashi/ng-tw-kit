import { Directive, signal } from '@angular/core';

@Directive({
  exportAs: 'ngtwInput',
  host: {
    '[class]': 'hostClasses()',
    role: 'input',
  },
  selector: 'input[ngtwInput]',
})
export class NgtwInput {
  protected hostClasses = signal(
    'cursor-text rounded-xs border-0 bg-zinc-800 px-2 py-2 text-current caret-purple-500 transition-[background-color,_opacity,_box-shadow] outline-none select-all selection:bg-purple-500/25 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-25',
  );
}
