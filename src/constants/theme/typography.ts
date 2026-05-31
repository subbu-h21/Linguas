// Font family names must match keys registered in useFonts()
export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

// Design spec: H1–Caption scale
export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 13,
  caption: 11,
} as const;

// Design spec line heights (multiplier)
export const lineHeight = {
  h1: 1.2,
  h2: 1.3,
  h3: 1.3,
  h4: 1.4,
  bodyLg: 1.6,
  bodyMd: 1.6,
  bodySm: 1.6,
  caption: 1.4,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

// Pre-computed pixel line heights (fontSize × lineHeightMultiplier)
export const lineHeightPx = {
  h1: Math.round(fontSize.h1 * lineHeight.h1),     // 38
  h2: Math.round(fontSize.h2 * lineHeight.h2),     // 31
  h3: Math.round(fontSize.h3 * lineHeight.h3),     // 26
  h4: Math.round(fontSize.h4 * lineHeight.h4),     // 22
  bodyLg: Math.round(fontSize.bodyLg * lineHeight.bodyLg), // 26
  bodyMd: Math.round(fontSize.bodyMd * lineHeight.bodyMd), // 22
  bodySm: Math.round(fontSize.bodySm * lineHeight.bodySm), // 21
  caption: Math.round(fontSize.caption * lineHeight.caption), // 15
} as const;
