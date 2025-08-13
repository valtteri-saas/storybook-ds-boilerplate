import { addons } from 'storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme: theme,
  navSize: 350,
  sidebar: {
    showRoots: true,
  },
  toolbar: {},
});
