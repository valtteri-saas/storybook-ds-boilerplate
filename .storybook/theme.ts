import { create } from 'storybook/theming/create';

export default create({
  base: 'dark', // or 'light'
  // Typography
  fontBase: '"Inter", sans-serif', // Update with your font family

  // Branding - CUSTOMIZE THESE FOR YOUR DESIGN SYSTEM
  brandTitle: '[System Name]', // Replace with your design system name
  brandImage: './logo.svg', // Replace logo.svg in public folder with your logo
  brandTarget: '_self',

  // Colors - Purple brand palette
  colorPrimary: '#6b4caa', // Purple-600
  colorSecondary: '#8760d4', // Purple-500

  // Toolbar default and active colors
  barTextColor: '#1d1d1d',
  barSelectedColor: '#1d1d1d',
  barHoverColor: '#1d1d1d',
  barBg: '#ffffff',
});
