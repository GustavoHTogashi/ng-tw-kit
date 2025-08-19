import { Signal, WritableSignal } from '@angular/core';

export type NgtwDropzoneState = {
  accept: WritableSignal<string>;
  fileSize: WritableSignal<string>;
  maxSize: WritableSignal<string>;
  multiple: WritableSignal<boolean>;
  usedSize: Signal<number>;
};

export type NgtwDropzoneUnit = 'b' | 'kb' | 'mb' | 'gb' | 'tb';
