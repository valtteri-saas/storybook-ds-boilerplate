# Design System Documentation Boilerplate

A comprehensive boilerplate for creating design system documentation using **Storybook**, **React**, **TypeScript**, and **Vite**. This template provides everything you need to document and showcase your design system with design tokens, components, and patterns.

## Features

✨ **Complete Design System Documentation**

- Pre-built pages for foundations, components, patterns, and resources
- Design tokens integration with automatic documentation generation
- Dark/light theme support
- Responsive documentation layout

🎨 **Design Tokens Support**

- JSON-based token system for colors, typography, spacing, borders, and data visualization
- Automatic token documentation generation
- CSS custom properties export
- Theme integration with popular UI libraries (Ant Design included)

📚 **Storybook Integration**

- Latest Storybook v9 with modern features
- Custom theme and branding with extensive styling customizations
- Clean, professional navigation and typography
- Organized navigation structure
- MDX documentation support

🛠 **Developer Experience**

- TypeScript support throughout
- ESLint and formatting configured
- Hot module replacement (HMR)
- Build optimization with Vite

## Quick Start

1. **Clone or download** this boilerplate
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run storybook
   ```

4. **Customize for your design system:**
   - Replace `[System Name]` placeholders throughout the codebase (see `PLACEHOLDERS.md`)
   - Update colors, tokens, and branding (see customization guide below)

## Customization Guide

### 1. Update Branding

**Package Information:**

```bash
# Update package.json
{
  "name": "your-design-system",
  "description": "[System Name] Documentation"
}
```

**Storybook Theme & Styling:**

- Edit `.storybook/theme.ts` to update colors, branding, and logo
- Replace `public/logo.svg` with your own logo
- Update the `brandTitle` to match your design system name (currently set to `[System Name]` as placeholder)
- Customize brand colors in `.storybook/manager-head.html` (sidebar selected states - currently purple palette)
- Customize brand colors in `.storybook/preview-head.html` (documentation links - currently purple palette)
- Both files contain extensive custom styling for a clean, professional look

### 2. Design Tokens

**Token Configuration:**

- Edit `tokens/tokens.json` to define your design tokens
- Tokens automatically generate CSS custom properties in `src/styles/tokens.css`
- Run `npm run generate:token-docs` to update token documentation

**Token Structure Example:**

```json
{
  "color": {
    "primary": {
      "value": "#your-primary-color",
      "type": "color",
      "description": "Primary brand color"
    }
  }
}
```

### 3. Content Customization

**Update Documentation:**

- `src/stories/about.mdx` - Your design system overview (contains `[System Name]` placeholders)
- `src/stories/resources.mdx` - Links to Figma, guidelines, etc.
- `src/stories/foundations/` - Foundation documentation (colors, typography, etc.)
- `src/stories/patterns/` - Pattern documentation
- `src/stories/content/` - Content guidelines

**Navigation Structure:**

- Edit `.storybook/preview.tsx` to customize the sidebar navigation order

### 4. Components

**Add Your Components:**

- Create component stories in `src/stories/components/`
- Follow the existing button example structure
- Use MDX for rich documentation with live examples

## Available Scripts

- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build static Storybook
- `npm run generate:token-docs` - Generate token documentation
- `npm run generate:ant-d-components` - Generate Ant Design integration docs
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Project Structure

```
├── .storybook/          # Storybook configuration + custom styling
│   ├── theme.ts         # Main Storybook theme configuration
│   ├── manager-head.html # Custom sidebar/navigation styling
│   └── preview-head.html # Custom documentation page styling
├── antd/                # UI library integration example
├── public/              # Static assets (replace logo.svg)
├── src/
│   ├── components/      # React components for documentation
│   ├── stories/         # Storybook stories and MDX docs
│   └── styles/          # Generated token styles
├── tokens/              # Design tokens JSON
├── types/               # TypeScript definitions
└── utils/               # Token generation utilities
```

## Deployment

This boilerplate works great with:

- **Vercel** (configuration included)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

Build the static site:

```bash
npm run build-storybook
```

## Token Integration

### CSS Custom Properties

Tokens automatically generate CSS custom properties:

```css
/* Generated in src/styles/tokens.css */
:root {
  --color-primary: #your-color;
  --spacing-sm: 8px;
}
```

### JavaScript/TypeScript

Import tokens in your code:

```typescript
import { getTokens } from './utils/getTokens';
const tokens = getTokens();
```

### UI Library Integration

Tokens can be easily integrated with popular UI libraries:

- **Ant Design**: Example integration included in `antd/themeVariables.ts`
- **Chakra UI**: Map tokens to theme object
- **Material-UI**: Use with custom theme provider
- **Styled Components**: Import tokens directly
- **CSS Modules**: Use generated CSS custom properties

## Contributing

1. Fork this repository
2. Make your changes
3. Test with `npm run storybook`
4. Submit a pull request

## License

MIT License - feel free to use this boilerplate for any project!

---

**Need help?** Check out the [Storybook documentation](https://storybook.js.org/docs) or [open an issue](https://github.com/your-username/design-system-boilerplate/issues).
