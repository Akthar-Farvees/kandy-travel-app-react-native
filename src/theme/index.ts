export const theme = {
  colors: {
    canopy: '#11271F',
    forest: '#1A3C31',
    forestSoft: '#2A584A',
    jade: '#4C7A65',
    mist: '#DDE8DE',
    cream: '#F5EFE2',
    ivory: '#FFFDF8',
    parchment: '#F8F2E8',
    sand: '#E7DAC3',
    gold: '#D4A45B',
    clay: '#BA6C4A',
    ink: '#183027',
    inkInverse: '#F8F3E9',
    muted: '#657469',
    border: '#E2D6C3',
    shadow: 'rgba(18, 39, 31, 0.14)',
    overlay: 'rgba(8, 23, 18, 0.48)',
    lake: '#5B728B',
    rose: '#A85F62',
  },
  fonts: {
    display: 'CormorantGaramond_600SemiBold',
    displayBody: 'CormorantGaramond_400Regular',
    displayBold: 'CormorantGaramond_700Bold',
    body: 'DMSans_500Medium',
    bodyRegular: 'DMSans_400Regular',
    bodySemi: 'DMSans_600SemiBold',
    bodyBold: 'DMSans_700Bold',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  typography: {
    caption: 11,
    footnote: 12,
    body: 14,
    callout: 15,
    headline: 17,
    title3: 20,
    title2: 24,
    title1: 28,
    largeTitle: 34,
  },
  radii: {
    small: 14,
    medium: 22,
    large: 30,
    xlarge: 38,
  },
  opacity: {
    glassDark: 'rgba(255, 250, 240, 0.16)',
    glassMedium: 'rgba(255, 250, 240, 0.24)',
    glassLight: 'rgba(255, 252, 245, 0.88)',
    glassCard: 'rgba(255, 251, 244, 0.98)',
    dimmed: 0.72,
    subtle: 0.06,
  },
  shadows: {
    soft: {
      elevation: 7,
      shadowColor: '#11271F',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 22,
    },
    card: {
      elevation: 4,
      shadowColor: '#11271F',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
    },
    elevated: {
      elevation: 12,
      shadowColor: '#11271F',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.16,
      shadowRadius: 28,
    },
  },
} as const;

export const categoryPalette: Record<
  string,
  { backgroundColor: string; textColor: string; accent: string }
> = {
  Tea: {
    backgroundColor: 'rgba(76, 122, 101, 0.12)',
    textColor: '#255344',
    accent: '#4C7A65',
  },
  Handicraft: {
    backgroundColor: 'rgba(212, 164, 91, 0.16)',
    textColor: '#8B5B20',
    accent: '#D4A45B',
  },
  Textile: {
    backgroundColor: 'rgba(168, 95, 98, 0.12)',
    textColor: '#8D4B4E',
    accent: '#A85F62',
  },
  Jewelry: {
    backgroundColor: 'rgba(91, 114, 139, 0.14)',
    textColor: '#41566D',
    accent: '#5B728B',
  },
  Spices: {
    backgroundColor: 'rgba(186, 108, 74, 0.14)',
    textColor: '#8B5137',
    accent: '#BA6C4A',
  },
  Pottery: {
    backgroundColor: 'rgba(42, 88, 74, 0.12)',
    textColor: '#2C5A4D',
    accent: '#2A584A',
  },
};

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;
