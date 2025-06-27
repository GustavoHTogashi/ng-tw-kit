import { Component } from '@angular/core';

@Component({
  host: {
    class:
      'flex flex-col rounded border-2 border-zinc-800 p-2 gap-1 font-mono text-xs select-none',
  },
  selector: 'sample-preview',
  template: `
    <header class="flex flex-row items-center justify-between text-zinc-500 p-2">
      <span class="flex flex-row items-center gap-2">
        <span class="h-3 w-3 rounded-full bg-red-400"></span>
        <span class="h-3 w-3 rounded-full bg-yellow-400"></span>
        <span class="h-3 w-3 rounded-full bg-green-400"></span>
      </span>
      <small class="text-2xs px-1 font-sans leading-none tracking-widest">
        preview
      </small>
    </header>
    <div
      class="max-h-96 overflow-auto scrollbar-track-zinc-900 rounded-lg bg-zinc-900 px-8 py-4 text-sm"
    >
      <ng-content />
    </div>
  `,
})
export class Preview {}
