/**
 * SIRA Website Color Theme Configuration
 * 
 * Primary Color Palette:
 * #F2E6EE - Light Pink/Beige (backgrounds, subtle accents)
 * #977DFF - Purple (primary highlights, interactive elements)
 * #FFCCF2 - Light Pink (backgrounds, highlights)
 * #0033FF - Blue (primary actions, important elements)
 * #0600AF - Dark Blue (secondary elements, text)
 * #0600AB - Medium Blue (tertiary elements)
 * #00003D - Dark Navy (strong accents, text)
 */

export const colors = {
  // Primary Colors
  lightPink: '#F2E6EE',
  purple: '#977DFF',
  lightPinkAccent: '#FFCCF2',
  blue: '#0033FF',
  darkBlue: '#0600AF',
  mediumBlue: '#0600AB',
  darkNavy: '#00003D',
} as const;

export const gradients = {
  // Primary Gradients
  primary: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.lightPinkAccent} 100%)`,
  tertiary: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.mediumBlue} 100%)`,
  accent: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.darkBlue} 100%)`,
  
  // Complex Gradients
  hero: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 50%, ${colors.darkBlue} 100%)`,
  card: `linear-gradient(135deg, ${colors.lightPink} 0%, ${colors.lightPinkAccent} 100%)`,
  button: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 50%, ${colors.mediumBlue} 100%)`,
  background: `linear-gradient(135deg, ${colors.lightPink} 0%, ${colors.lightPinkAccent} 50%, ${colors.lightPink} 100%)`,
  
  // Text Gradients
  textPrimary: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 100%)`,
  textSecondary: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.mediumBlue} 100%)`,
  textAccent: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.lightPinkAccent} 100%)`,
} as const;

export const theme = {
  colors: {
    // Background Colors
    background: {
      primary: colors.lightPink,
      secondary: colors.lightPinkAccent,
      dark: colors.darkNavy,
      card: '#ffffff',
      cardDark: '#1f2937',
    },
    
    // Text Colors
    text: {
      primary: colors.darkNavy,
      secondary: colors.darkBlue,
      accent: colors.blue,
      muted: '#6b7280',
      white: '#ffffff',
    },
    
    // Border Colors
    border: {
      primary: `${colors.blue}20`,
      secondary: `${colors.purple}20`,
      accent: `${colors.darkBlue}20`,
      muted: '#e5e7eb',
    },
    
    // Interactive Colors
    interactive: {
      primary: colors.blue,
      secondary: colors.purple,
      accent: colors.darkBlue,
      hover: `${colors.blue}10`,
      active: `${colors.purple}20`,
    },
    
    // Status Colors
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: colors.blue,
    },
  },
  
  gradients,
  
  // Component-specific color schemes
  components: {
    // Overview Cards
    overviewCards: [
      {
        label: 'Content Generated',
        color: colors.blue,
        bgColor: colors.lightPink,
        borderColor: `${colors.blue}30`,
      },
      {
        label: 'Images Created',
        color: colors.darkBlue,
        bgColor: colors.lightPinkAccent,
        borderColor: `${colors.darkBlue}30`,
      },
      {
        label: 'Active Projects',
        color: colors.purple,
        bgColor: colors.lightPink,
        borderColor: `${colors.purple}30`,
      },
      {
        label: 'Templates Used',
        color: colors.mediumBlue,
        bgColor: colors.lightPinkAccent,
        borderColor: `${colors.mediumBlue}30`,
      },
      {
        label: 'Scheduled Posts',
        color: colors.darkNavy,
        bgColor: colors.lightPink,
        borderColor: `${colors.darkNavy}30`,
      },
      {
        label: 'SEO Tools Used',
        color: colors.blue,
        bgColor: colors.lightPinkAccent,
        borderColor: `${colors.blue}30`,
      },
    ],
    
    // Quick Actions
    quickActions: [
      {
        title: 'Generate Content',
        gradient: `from-[${colors.blue}] to-[${colors.darkBlue}]`,
        bgColor: colors.lightPink,
        borderColor: `${colors.blue}30`,
      },
      {
        title: 'Social Media',
        gradient: `from-[${colors.purple}] to-[${colors.lightPinkAccent}]`,
        bgColor: colors.lightPinkAccent,
        borderColor: `${colors.purple}30`,
      },
      {
        title: 'Create Images',
        gradient: `from-[${colors.darkBlue}] to-[${colors.mediumBlue}]`,
        bgColor: colors.lightPink,
        borderColor: `${colors.darkBlue}30`,
      },
      {
        title: 'Ad Generation',
        gradient: `from-[${colors.mediumBlue}] to-[${colors.darkNavy}]`,
        bgColor: colors.lightPinkAccent,
        borderColor: `${colors.mediumBlue}30`,
      },
      {
        title: 'SEO Tools',
        gradient: `from-[${colors.blue}] to-[${colors.purple}]`,
        bgColor: colors.lightPink,
        borderColor: `${colors.blue}30`,
      },
      {
        title: 'AI Humanizer',
        gradient: `from-[${colors.darkNavy}] to-[${colors.mediumBlue}]`,
        bgColor: colors.lightPink,
        borderColor: `${colors.darkNavy}30`,
      },
      {
        title: 'Content Scheduler',
        gradient: `from-[${colors.purple}] to-[${colors.blue}]`,
        bgColor: colors.lightPinkAccent,
        borderColor: `${colors.purple}30`,
      },
    ],
    
    // Recent Activities
    activities: [
      {
        type: 'content',
        color: colors.blue,
        bgColor: colors.lightPink,
      },
      {
        type: 'image',
        color: colors.darkBlue,
        bgColor: colors.lightPinkAccent,
      },
      {
        type: 'seo',
        color: colors.purple,
        bgColor: colors.lightPink,
      },
      {
        type: 'calendar',
        color: colors.darkNavy,
        bgColor: colors.lightPinkAccent,
      },
    ],
  },
} as const;

// Tailwind CSS color classes for easy usage
export const tailwindColors = {
  lightPink: '[#F2E6EE]',
  purple: '[#977DFF]',
  lightPinkAccent: '[#FFCCF2]',
  blue: '[#0033FF]',
  darkBlue: '[#0600AF]',
  mediumBlue: '[#0600AB]',
  darkNavy: '[#00003D]',
} as const;

// CSS Custom Properties for dynamic theming
export const cssVariables = {
  '--color-light-pink': colors.lightPink,
  '--color-purple': colors.purple,
  '--color-light-pink-accent': colors.lightPinkAccent,
  '--color-blue': colors.blue,
  '--color-dark-blue': colors.darkBlue,
  '--color-medium-blue': colors.mediumBlue,
  '--color-dark-navy': colors.darkNavy,
  
  '--gradient-primary': gradients.primary,
  '--gradient-secondary': gradients.secondary,
  '--gradient-tertiary': gradients.tertiary,
  '--gradient-accent': gradients.accent,
  '--gradient-hero': gradients.hero,
  '--gradient-card': gradients.card,
  '--gradient-button': gradients.button,
  '--gradient-background': gradients.background,
} as const;

export default theme;
