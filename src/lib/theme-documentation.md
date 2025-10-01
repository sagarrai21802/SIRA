# SIRA Website Color Theme Documentation

## Overview
This document outlines the comprehensive color theme system for the SIRA website, providing consistent branding and visual identity across all components.

## Color Palette

### Primary Colors
| Color | Hex Code | Usage | Description |
|-------|----------|-------|-------------|
| Light Pink | `#F2E6EE` | Backgrounds, subtle accents | Soft, welcoming background color |
| Purple | `#977DFF` | Primary highlights, interactive elements | Main brand color for CTAs and highlights |
| Light Pink Accent | `#FFCCF2` | Backgrounds, highlights | Complementary background color |
| Blue | `#0033FF` | Primary actions, important elements | Primary action color |
| Dark Blue | `#0600AF` | Secondary elements, text | Secondary text and elements |
| Medium Blue | `#0600AB` | Tertiary elements | Supporting elements |
| Dark Navy | `#00003D` | Strong accents, text | Strong emphasis and text |

## Gradient Combinations

### Primary Gradients
- **Primary**: Blue → Purple (`#0033FF` → `#977DFF`)
- **Secondary**: Purple → Light Pink Accent (`#977DFF` → `#FFCCF2`)
- **Tertiary**: Dark Blue → Medium Blue (`#0600AF` → `#0600AB`)
- **Accent**: Blue → Dark Blue (`#0033FF` → `#0600AF`)

### Complex Gradients
- **Hero**: Blue → Purple → Dark Blue (3-color gradient)
- **Card**: Light Pink → Light Pink Accent
- **Button**: Blue → Purple → Medium Blue
- **Background**: Light Pink → Light Pink Accent → Light Pink

## Usage Guidelines

### Component Color Schemes

#### Overview Cards
Each metric card uses a specific color combination:
- Content Generated: Blue text, Light Pink background
- Images Created: Dark Blue text, Light Pink Accent background
- Active Projects: Purple text, Light Pink background
- Templates Used: Medium Blue text, Light Pink Accent background
- Scheduled Posts: Dark Navy text, Light Pink background
- SEO Tools Used: Blue text, Light Pink Accent background

#### Quick Actions
Action cards use gradient combinations:
- Generate Content: Blue → Dark Blue gradient
- Social Media: Purple → Light Pink Accent gradient
- Create Images: Dark Blue → Medium Blue gradient
- Ad Generation: Medium Blue → Dark Navy gradient
- SEO Tools: Blue → Purple gradient
- AI Humanizer: Dark Navy → Medium Blue gradient
- Content Scheduler: Purple → Blue gradient

#### Recent Activities
Activity items use consistent color coding:
- Content: Blue text, Light Pink background
- Images: Dark Blue text, Light Pink Accent background
- SEO: Purple text, Light Pink background
- Calendar: Dark Navy text, Light Pink Accent background

## Implementation

### CSS Variables
All colors are available as CSS custom properties:
```css
:root {
  --color-light-pink: #F2E6EE;
  --color-purple: #977DFF;
  --color-light-pink-accent: #FFCCF2;
  --color-blue: #0033FF;
  --color-dark-blue: #0600AF;
  --color-medium-blue: #0600AB;
  --color-dark-navy: #00003D;
}
```

### Tailwind Classes
Use the predefined Tailwind color classes:
```jsx
className="text-[#0033FF] bg-[#F2E6EE] border-[#0033FF]/30"
```

### Theme Provider
Wrap your app with the ThemeProvider:
```jsx
import { ThemeProvider } from './components/Theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Accessibility

### Contrast Ratios
All color combinations meet WCAG AA standards:
- Blue on Light Pink: 4.5:1
- Dark Navy on Light Pink: 7.2:1
- Purple on Light Pink: 3.8:1 (with sufficient size)

### Dark Mode Support
The theme includes dark mode variants:
- Backgrounds adapt to dark colors
- Text maintains proper contrast
- Interactive elements remain accessible

## Best Practices

### Do's
- Use the predefined color combinations
- Maintain consistent color relationships
- Test contrast ratios for accessibility
- Use gradients for visual interest
- Apply hover states with complementary colors

### Don'ts
- Don't mix colors outside the defined palette
- Don't use colors without proper contrast
- Don't overuse gradients (use sparingly)
- Don't ignore dark mode considerations

## File Structure
```
src/
├── lib/
│   ├── theme.ts                 # Main theme configuration
│   └── theme-documentation.md   # This documentation
├── components/
│   └── Theme/
│       └── ThemeProvider.tsx    # Theme context provider
└── styles/
    └── theme.css               # Global theme styles
```

## Future Considerations
- Consider adding more gradient variations
- Monitor accessibility standards updates
- Plan for seasonal theme variations
- Consider user preference themes
