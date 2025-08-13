# Setup Guide

This guide will help you customize this boilerplate for your own design system.

## Step 1: Basic Configuration

### Update Package Information

1. Edit `package.json`:

   - Change `name` from "design-system-boilerplate" to your design system name
   - Update `description`, `author`, and other metadata

2. **Replace placeholders** throughout the codebase:
   - Find and replace all instances of `[System Name]` with your design system name
   - See `PLACEHOLDERS.md` for a complete reference

### Update Branding

1. Replace `public/logo.svg` with your logo
2. Edit `.storybook/theme.ts`:
   - Update `brandTitle` from the placeholder `[System Name]` to your actual design system name
   - Customize `colorPrimary` and `colorSecondary` with your brand colors
   - Adjust other theme settings as needed

## Step 2: Design Tokens

### Customize Your Tokens

1. Edit `tokens/tokens.json`:
   - Replace example colors with your brand colors
   - Update typography tokens (font families, sizes, weights)
   - Customize spacing, border radius, and other values

### Generate Token Documentation

```bash
npm run generate:token-docs
```

This will update the CSS custom properties and documentation automatically.

## Step 3: Content Updates

### Core Documentation Pages

1. `src/stories/about.mdx` - Replace `[System Name]` placeholders with your design system information
2. `src/stories/resources.mdx` - Add links to your Figma files, brand guidelines, etc.
3. `src/stories/foundations/` - Customize foundation documentation as needed

### Navigation Structure

1. Edit `.storybook/preview.tsx` to customize the sidebar order
2. Add or remove sections based on your needs

## Step 4: Components

### Add Your Components

1. Create component stories in `src/stories/components/`
2. Follow the existing button example structure
3. Document props, usage guidelines, and variations

### Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your component props
  },
};
```

## Step 5: Advanced Customization

### Storybook Theme & Custom Styling

- Customize `.storybook/theme.ts` for basic theme configuration
- **Important**: Update brand colors in both custom styling files:
  - `.storybook/manager-head.html` - Contains sidebar and navigation styling (currently purple palette)
  - `.storybook/preview-head.html` - Contains documentation page styling (currently purple palette)
- These files provide extensive visual improvements over default Storybook styling

### Token Generation

- Modify `utils/generateTokenDocs.cjs` if you need custom token processing
- Update `utils/getTokens.ts` for different token consumption patterns

### UI Library Integration

- **Ant Design**: See `antd/themeVariables.ts` for complete integration example
- **Chakra UI**: Map design tokens to Chakra's theme structure
- **Material-UI**: Create theme provider with token values
- **Styled Components**: Import tokens directly in styled components
- **Tailwind CSS**: Generate Tailwind config from tokens
- **Any UI Library**: Use the generated CSS custom properties or import token values directly

## Step 6: Deployment

### Build and Deploy

```bash
npm run build-storybook
```

### Recommended Hosting

- **Vercel**: Zero-config deployment (vercel.json included)
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Free hosting for public repositories

## Tips

1. **Start Small**: Begin with core tokens and a few components
2. **Iterate**: Build your system incrementally based on team needs
3. **Document Everything**: Good documentation is key to adoption
4. **Automate**: Use the token generation scripts to keep things in sync
5. **Test**: Build components in isolation using Storybook

## Need Help?

- Check the main [README.md](./README.md) for more details
- Review existing examples in the `src/stories/` directory
- Refer to [Storybook documentation](https://storybook.js.org/docs)
