# Design System Documentation Boilerplate

A modern boilerplate for creating design system documentation using Storybook, React, and TypeScript. Features design token integration, custom styling, and automated documentation generation.

## Quick Start

```bash
npm install
npm run storybook
```

Replace `[System Name]` placeholders throughout the codebase and customize the tokens, colors, and branding as needed.

## Customization

### 1. Basic Setup

- Update `package.json` with your system name and details
- Edit `.storybook/theme.ts` for branding and colors
- Replace `public/logo.svg` with your logo
- Customize purple brand colors in `.storybook/manager-head.html` and `.storybook/preview-head.html`

### 2. Design Tokens

Edit `tokens/tokens.json` to define your design tokens. Tokens automatically generate CSS custom properties and documentation.

**Figma Integration:** Use the included Figma plugin to generate tokens directly from Figma variables in the correct format.

```bash
npm run generate:token-docs  # Update token documentation
```

### 3. Content & Components

- Replace `[System Name]` placeholders in `src/stories/` files
- Add component stories to `src/stories/components/`
- Customize navigation order in `.storybook/preview.tsx`

## Scripts

- `npm run storybook` - Start development server
- `npm run build-storybook` - Build for deployment
- `npm run generate:token-docs` - Generate token documentation

## Documentation Components

Includes pre-built React components for common design system documentation patterns:

- **DoDont** - Visual do/don't examples
- **Palette** - Color palette displays
- **Token** - Individual token documentation
- **TLDR** - Quick summary boxes
- **SpacingIndicators** - Spacing visualization
- **Logo** - Brand logo component

## Project Structure

```
├── .storybook/          # Storybook config + custom styling
├── src/
│   ├── components/      # Documentation helper components
│   └── stories/         # Documentation and component stories
├── tokens/              # Design tokens JSON
└── utils/               # Token generation scripts
```

## Token Integration

Tokens automatically generate CSS custom properties and can be imported for use with any UI library. Example Ant Design integration included in `antd/themeVariables.ts`.

## Deployment

```bash
npm run build-storybook
```

Deploy the generated `storybook-static` folder to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).
