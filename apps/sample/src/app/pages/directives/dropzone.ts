import { Component } from '@angular/core';
import { NgtwDropzone } from '@ngtw-kit/directives/dropzone';
import { Page } from '../../components';

@Component({
  imports: [NgtwDropzone, Page],
  selector: 'sample-dropzone',
  template: `
    <sample-page>
      <input ngtwDropzone placeholder="Enter dropzone text" />
    </sample-page>
  `,
})
export default class Dropzone {}
