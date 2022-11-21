export const isOld = (v: string) =>
  v.startsWith('rd') || v.startsWith('a') || v.startsWith('b') || /^1\.[1-6]\..+?$/.test(v)
export const isRelease = (v: string) => /^([a-z-]*)\d+\.\d+(\.\d+)?$/.test(v)
export const isSnapshot = (v: string) => /^\d{2}w\d{2}\w/.test(v)
