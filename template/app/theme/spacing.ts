/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  none: 0,
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  mediumLarge: 20,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
} as const

export type Spacing = keyof typeof spacing
