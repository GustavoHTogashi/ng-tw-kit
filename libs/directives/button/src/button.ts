import { Directive, signal } from '@angular/core';

@Directive({
  exportAs: 'ngtwButton',
  host: {
    '[class]': 'hostClasses()',
  },
  selector: 'button[ngtwButton]',
})
export class NgtwButton {
  protected hostClasses = signal(
    'cursor-pointer rounded bg-zinc-800 px-2 py-2 text-current transition-[background-color,_translate,_opacity] outline-none select-none hover:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-purple-500 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-25',
  );
}
