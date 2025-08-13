import type { Preview } from '@storybook/react-vite';
import React from 'react';
import ThemeProvider from '../src/components/ThemeProvider';

const withThemeProvider = (Story, context) => {
  const useTheme = context.parameters.useTheme !== false;
  return (
    <ThemeProvider useTheme={useTheme}>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withThemeProvider],
  parameters: {
    docs: {
      toc: true,
    },
    controls: {
      expanded: false,
      disableSaveFromUI: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'About',
          'Foundations',
          [
            'Tokens',
            [
              'Tokens explained',
              'Color',
              'Data',
              'Borders',
              'Typography',
              'Space',
            ],
          ],
          'Content',
          'Patterns',
          'Components',
          'Resources',
          'Updates',
        ],
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
