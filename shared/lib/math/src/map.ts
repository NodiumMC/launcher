/**
 * Mapping a number within a specified range
 * @param value value to map
 * @param fromMin
 * @param fromMax
 * @param toMin
 * @param toMax
 */
export function map(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}
