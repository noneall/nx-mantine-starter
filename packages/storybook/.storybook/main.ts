import type { StorybookConfig } from '@storybook/react-vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';
import { InlineConfig, mergeConfig } from 'vite';

const getPath = (storyPath: string) => {
  const result = path.resolve(process.cwd(), storyPath).replace(/\\/g, '/');
  return result;
};

const config: StorybookConfig = {
  stories: [getPath('packages/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)')],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'packages/storybook/vite.config.ts',
      },
    },
  },

  viteFinal: async (config) => {
    const c: InlineConfig = mergeConfig(config, {
      plugins: [nxViteTsPaths()],
    });

    return c;
  },

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: false,
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
