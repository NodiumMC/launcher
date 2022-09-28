const FontWeightMap: Record<FontWeightSemantic, FontWeightNumeric> = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
  extrablack: 950,
}

export const normalizeFontWeight = (weight: FontWeightLike) => {
  return typeof weight === 'string' ? FontWeightMap[weight] : weight
}
