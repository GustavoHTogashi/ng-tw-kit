import { Component } from '@angular/core';
import { Divider } from '../../components';
import { Block } from '../../components/block';
import { Code } from '../../components/code';
import { Subtitle } from '../../components/subtitle';
import { Title } from '../../components/title';

@Component({
  imports: [Divider, Title, Subtitle, Block, Code],
  selector: 'sample-home',
  template: `
    <div class="flex flex-col gap-4 p-4 text-zinc-300">
      <sample-title
        class="w-fit bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500 bg-clip-text p-1 font-mono text-transparent"
      >
        Ngtw-Kit
      </sample-title>
      <sample-divider />
      <sample-subtitle>Introduction</sample-subtitle>
      <sample-block>
        Ngtw-Kit is a collection of Angular components and utilities designed to
        help you build modern web applications with ease. It provides a set of
        reusable components, directives, services, utils that follow best
        practices and are easy to integrate into your projects.
      </sample-block>
      <sample-subtitle>Installation</sample-subtitle>
      <sample-block>
        To install Ngtw-Kit, you can use npm or yarn. Run the following command
        in your project directory:
        <sample-code language="bash" [code]="npmInstallationCommand" />
      </sample-block>
    </div>
  `,
})
export default class Home {
  npmInstallationCommand = `
npm install @ngtw-kit/core @ngtw-kit/directives @ngtw-kit/components @ngtw-kit/utils
  `;
}
