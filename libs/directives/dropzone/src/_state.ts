import { signal } from '@angular/core';
import { createStateManager } from '@ngtw-kit/common/core';
import { NgtwDropzoneState } from './_type';

export const DropzoneState = createStateManager<NgtwDropzoneState>(
  'NGTW_DROPZONE_STATE',
  () => {
    return {
      accept: signal('image/*'),
      fileSize: signal('mb'),
      maxSize: signal('5'),
      multiple: signal(false),
      usedSize: signal(0),
    };
  },
);
