export function map(value: number, fromMin: number, fromMax: number, toMin = 0, toMax = 100) {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}
