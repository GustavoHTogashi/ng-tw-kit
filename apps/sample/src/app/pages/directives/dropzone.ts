import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import {
  NgtwDropzone,
  NgtwDropzoneAcceptInfo,
  NgtwDropzoneSizeInfo,
} from '@ngtw-kit/directives/dropzone';
import { Page } from '../../components';
import { Log } from '@ngtw-kit/common/core';

@Component({
  imports: [NgtwDropzone, NgtwDropzoneAcceptInfo, NgtwDropzoneSizeInfo, Page],
  providers: [provideIcons({ lucideDownload })],
  selector: 'sample-dropzone',
  template: `
    <sample-page>
      <div
        (ngtwDropzoneApproved)="onApproved($event)"
        (ngtwDropzoneRejected)="onRejected($event)"
        ngtwDropzone
        ngtwDropzoneAccept="image/png,image/jpeg,image/svg+xml"
        ngtwDropzoneFileSize="1mb"
        ngtwDropzoneMaxSize="10mb"
        ngtwDropzoneMultiple
      >
        <p ngtwDropzoneAcceptInfo></p>
        <p ngtwDropzoneSizeInfo></p>
      </div>
    </sample-page>
  `,
})
export default class Dropzone {
  onApproved(files: File[]): void {
    Log.info('Files approved:', files);
  }

  onRejected(files: File[]): void {
    Log.fatal('Files rejected:', files);
  }
}
