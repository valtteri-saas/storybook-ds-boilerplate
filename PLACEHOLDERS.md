# Placeholder Reference Guide

This boilerplate uses clear placeholders that are easy to find and replace when customizing for your design system.

## Text Placeholders

### `[System Name]`

**Used throughout the documentation for your design system name**

**Files containing `[System Name]`:**

- `.storybook/theme.ts` - Main Storybook branding
- `.storybook/manager-head.html` - Meta tags and page titles
- `src/stories/about.mdx` - Main about page content
- `src/stories/resources.mdx` - Resource page references
- `src/stories/updates.mdx` - Updates page content
- `src/stories/foundations/tokens-explained.mdx` - Token documentation

**How to replace:**
Use your IDE's "Find and Replace" feature to replace all instances of `[System Name]` with your actual design system name.

### `[Date]`

**Used in example update entries**

**Files:**

- `src/stories/updates.mdx` - Example update entry

### URL Placeholders

**Used for external links that need customization**

- `https://www.figma.com/design/your-figma-link` - Replace with your Figma UI kit URL
- `https://your-brand-guidelines-link` - Replace with your brand guidelines URL

## Search and Replace Strategy

### Quick Replacement (Recommended)

1. Use your IDE's global "Find and Replace" feature
2. Search for: `[System Name]`
3. Replace with: `Your Actual Design System Name`
4. Replace all instances at once

### Manual Approach

If you prefer to replace each instance individually:

1. Search for `[System Name]` in your IDE
2. Navigate through each result
3. Replace with context-appropriate naming

## Verification

After replacing placeholders, search for any remaining bracket placeholders:

- Search for `[` to find any missed placeholders
- Check Storybook preview to ensure all names appear correctly
- Review meta tags in browser developer tools

## Additional Customization

Beyond text placeholders, also customize:

- Logo file: `public/logo.svg`
- Colors: See `COLORS.md` for color customization locations
- Tokens: Edit `tokens/tokens.json` with your design tokens
- Package metadata: Update `package.json` with your project details
