import { Directive, signal } from '@angular/core';

@Directive({
  exportAs: 'ngtwSwitch',
  host: {
    '[class]': 'hostClass()',
    type: 'checkbox',
    role: 'switch',
  },
  selector: 'input[ngtwSwitch]',
})
export class NgtwSwitch {
  protected readonly hostClass = signal(
    'relative h-6 w-12 cursor-pointer rounded-full border-none bg-zinc-800 !bg-none ring-0 ring-offset-0 outline-0 outline-offset-0 transition-colors outline-none select-none before:absolute before:top-1/2 before:h-full before:w-1/2 before:translate-x-0 before:-translate-y-1/2 before:rounded-full before:bg-zinc-700 before:outline-0 before:transition-[translate,_background-color] checked:before:translate-x-full checked:before:bg-zinc-300 hover:before:bg-zinc-700/50 checked:hover:before:bg-zinc-300/50 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-25',
  );
}
