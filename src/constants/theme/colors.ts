export const colors = {
  // Primary brand
  linguaPurple: '#6C4EF5',
  linguaDeepPurple: '#5B3BF6',
  linguaBlue: '#4D88FF',
  linguaGreen: '#21C16B',

  // Semantic
  success: '#21C16B',
  warning: '#FFCB00',
  streak: '#FF8A00',
  error: '#FF4D4F',
  info: '#4D88FF',

  // Neutrals
  foreground: '#001132',
  muted: '#6B7280',
  border: '#E5E7EB',
  surface: '#F6F7FB',
  background: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof colors;
