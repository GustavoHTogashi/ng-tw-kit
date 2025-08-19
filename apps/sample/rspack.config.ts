import { createConfig } from '@nx/angular-rspack';

export default createConfig(
  {
    options: {
      root: __dirname,

      outputPath: {
        base: '../../dist/apps/sample',
      },
      index: './src/index.html',
      browser: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [
        {
          glob: '**/*',
          input: './public',
        },
      ],
      styles: ['./src/styles.css'],
    },
  },
  {
    production: {
      options: {
        budgets: [
          {
            type: 'initial',
            maximumWarning: '500kb',
            maximumError: '1mb',
          },
          {
            type: 'anyComponentStyle',
            maximumWarning: '4kb',
            maximumError: '8kb',
          },
        ],
        outputHashing: 'all',
        devServer: {},
      },
    },

    development: {
      options: {
        optimization: false,
        extractLicenses: false,
        namedChunks: true,
        devServer: {
          port: 10000,
        },
      },
    },
  },
);
