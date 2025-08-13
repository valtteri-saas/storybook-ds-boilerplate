# Color Palette Reference

This boilerplate uses a purple color palette as an example. You can easily customize these colors to match your brand.

## Current Purple Palette

```css
/* Purple Color Ramp (50 = lightest, 900 = darkest) */
--purple-50: #f2eeff;
--purple-100: #e6ddff;
--purple-200: #cfbcff;
--purple-300: #b89aff;
--purple-400: #a375ff;
--purple-500: #8760d4;
--purple-600: #6b4caa;
--purple-700: #513983;
--purple-800: #38265c;
--purple-900: #211439;
```

## Where Colors Are Used

### Storybook Theme (`.storybook/theme.ts`)

- **Primary**: Purple-600 (`#6b4caa`) - Main theme color
- **Secondary**: Purple-500 (`#8760d4`) - Accent color

### Sidebar Styling (`.storybook/manager-head.html`)

- **Selected Item Background**: Purple-500 with 15% opacity (`rgba(135, 96, 212, 0.15)`)
- **Selected Item Text**: Purple-600 (`rgb(107, 76, 170)`)
- **Hover Background**: Purple-500 with 8% opacity (`rgba(135, 96, 212, 0.08)`)

### Documentation Links (`.storybook/preview-head.html`)

- **Link Color**: Purple-600 (`#6b4caa`)
- **Link Hover**: Purple-700 (`#513983`)

## Customizing Colors

To change to your brand colors:

1. **Update the color values** in all three locations above
2. **Use appropriate contrast ratios** for accessibility
3. **Test in both light and dark themes** if you support theme switching
4. **Consider using a color palette generator** for consistent color ramps

## Accessibility Guidelines

- Ensure text contrast ratio is at least 4.5:1 for normal text
- Ensure text contrast ratio is at least 3:1 for large text
- Test color combinations with color blindness simulators
- Provide sufficient visual distinction between interactive states
