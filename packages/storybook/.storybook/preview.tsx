/* eslint-disable @typescript-eslint/no-explicit-any */
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { theme } from '@gamba/core';
import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const handleColorScheme = (value: boolean) =>
      setColorScheme(value ? 'dark' : 'light');
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [setColorScheme]);

  return children;
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <ColorSchemeWrapper>
        <Story />
      </ColorSchemeWrapper>
    ),
    (Story) => (
      <MantineProvider theme={theme}>
        <div className="qqqwwweee">
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default preview;
