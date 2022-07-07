export const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number =>
  (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
