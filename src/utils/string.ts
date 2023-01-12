export const format = (input: string, ...args: any[]) => {
  let index = 0
  return input.replace(/(.?){([A-z0-9._:#]*?)}/g, (match, prefix = '', template) => {
    const current = index++
    if (template.length === 0) return prefix + (args[current]?.toString?.() ?? '')
    else return match
  })
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('String format', () => {
    it.concurrent('Should format', () => {
      expect(format("Hi! My name is {}. I'm {}", 'Danil', 16)).toBe("Hi! My name is Danil. I'm 16")
    })
    it.concurrent('Should insert remove when args not provided', () => {
      expect(format('a{}b{}c')).toBe('abc')
    })
  })
}
