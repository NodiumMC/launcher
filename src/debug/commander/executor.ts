import { log, endTime, time, warn, error } from 'debug'
import JSON5 from 'json5'
import { container } from 'tsyringe'
import { resolve } from 'mobmarch'

const applyAsync = (input: string): string => {
  return `
  return (async function* () {
    yield undefined
    ${input}
  })()
  `
}

const applyContextSyntax = (input: string): string => {
  return input.replace(/(<-|->)\s(\w+)\s?(as)?\s?(\w+)?/gm, (_, direction, value, $as, name) => {
    const naming = $as ? name : value
    if (direction === '<-')
      return `;($[namespace] = $[namespace] ?? {}, $[namespace].${naming} = ${$as ? JSON5.parse(value) : value})`
    if (direction === '->') return `$[namespace].${value}`
    throw new Error('Invalid context syntax')
  })
}

const applyContainer = (input: string): string => {
  return input.replace(/&(\w+)/gm, (_, service) => {
    return `(await $$__resolve(Array.from($$__container._registry._registryMap.keys()).find(v => v.name === '${service}') ?? error('Unknown service: ${service}')))`
  })
}

const applyImport = (input: string): string => {
  return input.replace(/import\s*\(["']([A-z/0-9]+?)["']\)/gm, (_, path) => `import('../../${path}')`)
}

const applyReturn = (input: string): string => {
  return input.replace(/<<\s(.+)/gm, (_, value) => {
    return `yield ${value}`
  })
}

const context = {
  log,
  endTime,
  time,
  warn,
  error,
  console: { log, warn, error },
  $: {},
  namespace: 'global',
  $$__container: container,
  $$__resolve: resolve,
}

export const execute = async (code: string) => {
  try {
    const it = await new Function(
      ...Object.keys(context),
      applyImport(applyReturn(applyContainer(applyContextSyntax(applyAsync(code))))),
    )(...Object.values(context))
    for await (const i of it) if (i !== undefined && i !== null) log(i)
  } catch (e: any) {
    error(e)
  }
}
