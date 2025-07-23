import {
  booleanAttribute,
  computed,
  Directive,
  input,
  output,
  signal,
} from '@angular/core';
import { mimeTypeAttributes } from '@ngtw-kit/common/core';
import { createDropzoneState, provideDropzoneState } from './_state';
import { coerceStringArray } from '@angular/cdk/coercion'

@Directive({
  exportAs: 'ngtwDropzone',
  host: {
    '(dragleave)': 'onDragLeave()',
    '(dragover)': 'onDragOver($event)',
    '(drop)': 'onDrop($event)',
    '[attr.data-ngtw-dropzone-over]': 'over() ? "" : null',
    '[class]': 'hostClass()',
    'aria-dropeffect': 'copy',
    'aria-label': 'Drop files here',
  },
  providers: [provideDropzoneState()],
  selector: '[ngtwDropzone]',
})
export class NgtwDropzone {
  accept = input('*/*', {
    alias: 'ngtwDropzoneAccept',
    transform: mimeTypeAttributes,
  });
  fileSize = input('0kb', {
    alias: 'ngtwDropzoneFileSize',
  });
  maxSize = input('0kb', {
    alias: 'ngtwDropzoneMaxSize',
  });
  multiple = input(false, {
    alias: 'ngtwDropzoneMultiple',
    transform: booleanAttribute,
  });

  approved = output<File[]>({ alias: 'ngtwDropzoneApproved' });
  rejected = output<File[]>({ alias: 'ngtwDropzoneRejected' });

  over = signal(false);

  files = signal<File[]>([]);
  usedMaxSize = computed(() => {
    return this.files().reduce((total, { size }) => total + size, 0);
  });

  protected readonly state = createDropzoneState({
    accept: this.accept,
    fileSize: this.fileSize,
    maxSize: this.maxSize,
    multiple: this.multiple,
    usedSize: this.usedMaxSize,
  });

  protected readonly hostClass = signal(
    'relative flex flex-col gap-1 bg-zinc-800 p-1 outline-transparent transition-colors before:absolute before:inset-0 before:flex before:items-center before:justify-center before:bg-zinc-800 before:text-2xs before:text-zinc-500 before:content-none data-[ngtw-dropzone-over]:bg-zinc-800/50 data-[ngtw-dropzone-over]:outline-2 data-[ngtw-dropzone-over]:-outline-offset-2 data-[ngtw-dropzone-over]:outline-zinc-800 data-[ngtw-dropzone-over]:outline-dashed data-[ngtw-dropzone-over]:before:content-["Drop_files_here"]',
  );

  private matchFile(file: File): boolean {
    if (!this.accept()) return true;
    return this.accept()
      .split(',')
      .some((acceptType) => {
        if (acceptType.startsWith('.')) {
          return file.name.toLowerCase().endsWith(acceptType);
        }

        if (acceptType.endsWith('/*')) {
          return file.type.startsWith(acceptType.slice(0, -1));
        }

        return file.type === acceptType;
      });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.over.set(true);
  }

  onDragLeave(): void {
    this.over.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.over.set(false);

    if (!event.dataTransfer?.files.length) return;

    const files = Array.from(event.dataTransfer.files);

    const approved: File[] = [];
    const rejected: File[] = [];

    for (const file of files) {
      if (this.matchFile(file)) {
        approved.push(file);
        continue;
      }

      rejected.push(file);
    }

    if (approved.length) {
      this.approved.emit(approved);
      this.files.update((currentFiles) => [...currentFiles, ...approved]);
    }
    if (rejected.length) this.rejected.emit(rejected);
  }
}
